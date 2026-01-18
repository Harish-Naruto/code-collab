// src/components/CollaborativeEditor.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import * as Y from "yjs";
import {
  Awareness,
  encodeAwarenessUpdate,
  applyAwarenessUpdate,
} from "y-protocols/awareness";
import { MonacoBinding } from "y-monaco";
import monaco, { initializeMonaco } from "./monacoSetup";

// =============================================================================
// CONSTANTS
// =============================================================================

const MESSAGE_TYPES = {
  SYNC: 0,
  AWARENESS: 1,
} as const;

const CONFIG = {
  RECONNECT_INTERVAL: 3000,
  MAX_DEBUG_LINES: 50,
  AWARENESS_DELAY: 100,
  CURSOR_UPDATE_DEBOUNCE: 50, // Add debounce for cursor updates
} as const;

const USER_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
  "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
] as const;

const USER_NAMES = {
  adjectives: ["Quick", "Clever", "Bright", "Bold", "Swift", "Smart"],
  nouns: ["Coder", "Developer", "Hacker", "Builder", "Writer", "Thinker"]
} as const;

// =============================================================================
// TYPES
// =============================================================================

export interface CollaborativeEditorProps {
  roomId: string;
  userName?: string;
  wsUrl?: string;
}

interface UserState {
  name: string;
  color: string;
}

interface CursorState {
  anchor: { line: number; column: number };
  head: { line: number; column: number };
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface ConnectionState {
  status: ConnectionStatus;
  error?: string;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const getUserColor = (): string => {
  return USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
};

const generateUserName = (): string => {
  const { adjectives, nouns } = USER_NAMES;
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);
  return `${adjective}${noun}${number}`;
};

const getStatusColor = (status: ConnectionStatus): string => {
  const colors = {
    connected: '#4ECDC4',
    connecting: '#FFEAA7',
    disconnected: '#FF6B6B',
    error: '#FF4757'
  };
  return colors[status] || '#95A5A6';
};

const getStatusText = (connectionState: ConnectionState): string => {
  switch (connectionState.status) {
    case 'connected': return 'Connected';
    case 'connecting': return 'Connecting...';
    case 'disconnected': return 'Disconnected';
    case 'error': return `Error: ${connectionState.error}`;
    default: return 'Unknown';
  }
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CollaborativeEditor({
  roomId,
  userName,
  wsUrl = "ws://localhost:1234"
}: CollaborativeEditorProps) {
  
  // ==========================================================================
  // REFS
  // ==========================================================================
  
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const ydocRef = useRef<Y.Doc | null>(null);
  const awarenessRef = useRef<Awareness | null>(null);
  const bindingRef = useRef<MonacoBinding | null>(null);
  const remoteDecorationsRef = useRef<Map<number, string[]>>(new Map());
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCleaningUpRef = useRef(false);
  
  // Add refs to prevent recursive calls
  const isUpdatingCursorsRef = useRef(false);
  const cursorUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCursorStateRef = useRef<string>("");

  // ==========================================================================
  // STATE
  // ==========================================================================
  
  const [connectedUsers, setConnectedUsers] = useState<UserState[]>([]);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [connectionState, setConnectionState] = useState<ConnectionState>({ 
    status: 'connecting' 
  });

  // ==========================================================================
  // DEBUG UTILITIES
  // ==========================================================================
  
  const addDebug = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `${timestamp}: ${msg}`;
    console.log("[CollabEditor]", msg);
    
    setDebugInfo(prev => {
      const newInfo = [logEntry, ...prev];
      return newInfo.slice(0, CONFIG.MAX_DEBUG_LINES);
    });
  }, []);

  // ==========================================================================
  // WEBSOCKET CONNECTION MANAGEMENT
  // ==========================================================================
  
  const sendUpdate = useCallback((update: Uint8Array) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        const msg = new Uint8Array(1 + update.length);
        msg[0] = MESSAGE_TYPES.SYNC;
        msg.set(update, 1);
        ws.send(msg);
      } catch (error) {
        addDebug(`Failed to send update: ${error}`);
      }
    }
  }, [addDebug]);

  const sendAwareness = useCallback((clients: number[]) => {
    const ws = wsRef.current;
    const awareness = awarenessRef.current;
    
    if (ws && ws.readyState === WebSocket.OPEN && awareness && clients.length > 0) {
      try {
        const update = encodeAwarenessUpdate(awareness, clients);
        const msg = new Uint8Array(1 + update.length);
        msg[0] = MESSAGE_TYPES.AWARENESS;
        msg.set(update, 1);
        ws.send(msg);
      } catch (error) {
        addDebug(`Failed to send awareness: ${error}`);
      }
    }
  }, [addDebug]);

  const createWebSocketConnection = useCallback(() => {
    if (isCleaningUpRef.current) return;
    
    const ydoc = ydocRef.current;
    const awareness = awarenessRef.current;
    if (!ydoc || !awareness) return;

    try {
      setConnectionState({ status: 'connecting' });
      addDebug(`Connecting to ${wsUrl}/${roomId}`);
      
      const ws = new WebSocket(`${wsUrl}/${roomId}`);
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      // WebSocket event handlers
      ws.onopen = () => {
        if (isCleaningUpRef.current) return;
        
        addDebug("WebSocket connected");
        setConnectionState({ status: 'connected' });
        
        // Send initial awareness after connection
        setTimeout(() => {
          if (ws.readyState === WebSocket.OPEN && awareness) {
            const update = encodeAwarenessUpdate(awareness, [awareness.clientID]);
            const msg = new Uint8Array(1 + update.length);
            msg[0] = MESSAGE_TYPES.AWARENESS;
            msg.set(update, 1);
            ws.send(msg);
          }
        }, CONFIG.AWARENESS_DELAY);
      };

      ws.onmessage = (event) => {
        if (isCleaningUpRef.current) return;
        
        try {
          const data = new Uint8Array(event.data);
          const type = data[0];
          const payload = data.slice(1);
          
          if (type === MESSAGE_TYPES.SYNC) {
            Y.applyUpdate(ydoc, payload);
          } else if (type === MESSAGE_TYPES.AWARENESS) {
            applyAwarenessUpdate(awareness, payload, "ws");
          }
        } catch (error) {
          addDebug(`Message processing error: ${error}`);
        }
      };

      ws.onerror = (error) => {
        addDebug(`WebSocket error: ${error}`);
        setConnectionState({ status: 'error', error: 'Connection error' });
      };

      ws.onclose = (event) => {
        if (isCleaningUpRef.current) return;
        
        addDebug(`WebSocket closed: ${event.code} ${event.reason}`);
        setConnectionState({ status: 'disconnected' });
        
        // Schedule reconnection
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
        
        reconnectTimeoutRef.current = setTimeout(() => {
          if (!isCleaningUpRef.current) {
            addDebug("Attempting to reconnect...");
            createWebSocketConnection();
          }
        }, CONFIG.RECONNECT_INTERVAL);
      };

    } catch (error) {
      addDebug(`Failed to create WebSocket: ${error}`);
      setConnectionState({ status: 'error', error: 'Failed to connect' });
    }
  }, [wsUrl, roomId, addDebug]);

  // ==========================================================================
  // CURSOR AND SELECTION MANAGEMENT
  // ==========================================================================
  
  const cleanupDynamicStyles = useCallback(() => {
    document.querySelectorAll('[id^="cursor-style-"]').forEach(el => el.remove());
  }, []);

  const createUserCursorStyle = useCallback((clientId: number, name: string, color: string) => {
    const existingStyle = document.getElementById(`cursor-style-${clientId}`);
    if (existingStyle) return; // Don't recreate if already exists
    
    const style = document.createElement("style");
    style.id = `cursor-style-${clientId}`;
    style.innerHTML = `
      .remote-cursor-${clientId} {
        border-left: 2px solid ${color} !important;
        position: relative;
      }
      .remote-cursor-${clientId}::after {
        content: "${name}";
        background: ${color};
        color: white;
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 3px;
        position: absolute;
        top: -24px;
        left: -1px;
        white-space: nowrap;
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .remote-selection-${clientId} {
        background-color: ${color}40 !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const updateRemoteCursors = useCallback(() => {
    // Prevent recursive calls
    if (isUpdatingCursorsRef.current || isCleaningUpRef.current) return;
    
    const awareness = awarenessRef.current;
    const editor = editorInstanceRef.current;
    
    if (!awareness || !editor) return;

    const model = editor.getModel();
    if (!model) return;

    // Create a hash of current awareness state to prevent unnecessary updates
    const currentStateHash = JSON.stringify(Array.from(awareness.getStates().entries()));
    if (currentStateHash === lastCursorStateRef.current) return;
    
    lastCursorStateRef.current = currentStateHash;
    isUpdatingCursorsRef.current = true;

    try {
      const states = awareness.getStates();
      const users: UserState[] = [];

      // Build new decorations without clearing old ones first
      const newDecorations = new Map<number, string[]>();

      states.forEach((state: any, clientId: number) => {
        if (clientId === awareness.clientID || !state.user) return;

        const { name, color } = state.user;
        users.push({ name, color });

        if (!state.cursor) return;

        const { anchor, head } = state.cursor;

        // Create CSS for this user's cursor and selection
        createUserCursorStyle(clientId, name, color);

        const decorationsToAdd: monaco.editor.IModelDeltaDecoration[] = [];

        // Add cursor decoration
        const cursorRange = new monaco.Range(head.line, head.column, head.line, head.column);
        decorationsToAdd.push({
          range: cursorRange,
          options: {
            className: `remote-cursor-${clientId}`,
            stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
          },
        });

        // Add selection decoration if there's a selection
        if (anchor.line !== head.line || anchor.column !== head.column) {
          const selectionRange = new monaco.Range(
            anchor.line,
            anchor.column,
            head.line,
            head.column
          );
          
          decorationsToAdd.push({
            range: selectionRange,
            options: {
              className: `remote-selection-${clientId}`,
              stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
          });
        }

        // Apply decorations
        const oldDecorations = remoteDecorationsRef.current.get(clientId) || [];
        const newDecorationsForClient = editor.deltaDecorations(oldDecorations, decorationsToAdd);
        newDecorations.set(clientId, newDecorationsForClient);
      });

      // Clean up decorations for users who are no longer present
      remoteDecorationsRef.current.forEach((decorations, clientId) => {
        if (!newDecorations.has(clientId)) {
          editor.deltaDecorations(decorations, []);
          // Remove the style element for this client
          const styleEl = document.getElementById(`cursor-style-${clientId}`);
          if (styleEl) styleEl.remove();
        }
      });

      // Update decorations map and users state
      remoteDecorationsRef.current = newDecorations;
      setConnectedUsers(users);
      
    } catch (error) {
      addDebug(`Error updating cursors: ${error}`);
    } finally {
      isUpdatingCursorsRef.current = false;
    }
  }, [createUserCursorStyle, addDebug]);

  // Debounced version of updateRemoteCursors
  const debouncedUpdateCursors = useCallback(() => {
    if (cursorUpdateTimeoutRef.current) {
      clearTimeout(cursorUpdateTimeoutRef.current);
    }
    
    cursorUpdateTimeoutRef.current = setTimeout(() => {
      updateRemoteCursors();
    }, CONFIG.CURSOR_UPDATE_DEBOUNCE);
  }, [updateRemoteCursors]);

  // ==========================================================================
  // INITIALIZATION AND CLEANUP
  // ==========================================================================
  
  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize Monaco environment before creating editor
    initializeMonaco();

    isCleaningUpRef.current = false;
    addDebug("Initializing collaborative editor");

    // Initialize Yjs document and awareness
    const ydoc = new Y.Doc();
    const yText = ydoc.getText("monaco");
    const awareness = new Awareness(ydoc);
    
    ydocRef.current = ydoc;
    awarenessRef.current = awareness;

    // Set up user identity
    const finalName = userName || generateUserName();
    const userColor = getUserColor();

    awareness.setLocalStateField("user", { name: finalName, color: userColor });
    addDebug(`User: ${finalName} (${userColor})`);

    // Create Monaco editor instance
    const editor = monaco.editor.create(editorRef.current, {
      value: "// Welcome to the collaborative editor!\n// Start typing to see real-time collaboration in action.",
      language: "javascript",
      theme: "vs-dark",
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: "on",
      lineNumbers: "on",
      folding: true,
      selectOnLineNumbers: true,
    });

    editorInstanceRef.current = editor;

    // Create Y-Monaco binding for synchronization
    const binding = new MonacoBinding(
      yText,
      editor.getModel()!,
      new Set([editor]),
      awareness
    );
    bindingRef.current = binding;

    // Set up event handlers for document and awareness updates
    ydoc.on("update", sendUpdate);
    awareness.on("update", ({ added, updated, removed }) => {
      sendAwareness([...added, ...updated, ...removed]);
    });

    // Track cursor and selection changes for awareness (debounced)
    let cursorTimeout: NodeJS.Timeout | null = null;
    editor.onDidChangeCursorSelection((e) => {
      if (cursorTimeout) clearTimeout(cursorTimeout);
      
      cursorTimeout = setTimeout(() => {
        const selection = e.selection;
        const anchor = selection.getStartPosition();
        const head = selection.getEndPosition();
        
        awareness.setLocalStateField("cursor", {
          anchor: { line: anchor.lineNumber, column: anchor.column },
          head: { line: head.lineNumber, column: head.column },
        });
      }, 50); // Debounce cursor updates
    });

    // Listen for awareness changes to update remote cursors (debounced)
    awareness.on("change", debouncedUpdateCursors);

    // Establish WebSocket connection
    createWebSocketConnection();

    // Cleanup function
    return () => {
      addDebug("Cleaning up collaborative editor");
      isCleaningUpRef.current = true;

      // Clear timeouts
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (cursorUpdateTimeoutRef.current) {
        clearTimeout(cursorUpdateTimeoutRef.current);
      }
      
      if (cursorTimeout) {
        clearTimeout(cursorTimeout);
      }

      // Destroy Monaco binding
      if (bindingRef.current) {
        bindingRef.current.destroy();
      }

      // Clean up editor and decorations
      if (editorInstanceRef.current) {
        remoteDecorationsRef.current.forEach((decorations) => {
          editorInstanceRef.current?.deltaDecorations(decorations, []);
        });
        editorInstanceRef.current.dispose();
      }

      // Destroy Yjs components
      if (awarenessRef.current) {
        awarenessRef.current.destroy();
      }

      if (ydocRef.current) {
        ydocRef.current.destroy();
      }

      // Close WebSocket connection
      if (wsRef.current) {
        wsRef.current.close();
      }

      // Clean up dynamic styles
      cleanupDynamicStyles();
      
      // Clear decorations map
      remoteDecorationsRef.current.clear();
    };
  }, [
    roomId, 
    userName, 
    sendUpdate, 
    sendAwareness, 
    createWebSocketConnection, 
    debouncedUpdateCursors, // Use debounced version
    addDebug,
    cleanupDynamicStyles
  ]);

  // ==========================================================================
  // RENDER
  // ==========================================================================
  
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: 'system-ui' }}>
      
      {/* Sidebar with connection info and debug panel */}
      <div
        style={{
          width: "280px",
          background: "#1e1e1e",
          color: "#fff",
          fontSize: "12px",
          padding: "16px",
          overflowY: "auto",
          borderRight: "1px solid #333",
        }}
      >
        
        {/* Connection Status Panel */}
        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ margin: "0 0 8px 0", color: "#fff" }}>Connection Status</h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              background: "#2d2d2d",
              borderRadius: "6px",
              border: `2px solid ${getStatusColor(connectionState.status)}`,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: getStatusColor(connectionState.status),
                marginRight: "8px",
              }}
            />
            <span style={{ fontSize: "11px" }}>{getStatusText(connectionState)}</span>
          </div>
        </div>

        {/* Connected Users Panel */}
        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ margin: "0 0 8px 0", color: "#fff" }}>
            Connected Users ({connectedUsers.length + 1})
          </h4>
          
          {/* Current user */}
          <div
            style={{
              background: "#2d2d2d",
              padding: "8px",
              borderRadius: "6px",
              marginBottom: "6px",
              border: "2px solid #4ECDC4",
            }}
          >
            You
          </div>
          
          {/* Remote users */}
          {connectedUsers.map((user, i) => (
            <div
              key={i}
              style={{
                background: "#2d2d2d",
                padding: "8px",
                borderRadius: "6px",
                margin: "6px 0",
                border: `2px solid ${user.color}`,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: user.color,
                  marginRight: "8px",
                }}
              />
              {user.name}
            </div>
          ))}
        </div>

        {/* Debug Information Panel */}
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "#fff" }}>Debug Log</h4>
          <div
            style={{
              background: "#2d2d2d",
              padding: "8px",
              borderRadius: "6px",
              fontSize: "10px",
              fontFamily: "monospace",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {debugInfo.length > 0 ? (
              debugInfo.map((line, i) => (
                <div 
                  key={i} 
                  style={{ 
                    marginBottom: "2px", 
                    opacity: i === 0 ? 1 : 0.7 
                  }}
                >
                  {line}
                </div>
              ))
            ) : (
              <div style={{ opacity: 0.5 }}>No debug info yet...</div>
            )}
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div style={{ flex: 1,width:"650px",height:"850px"  }} ref={editorRef} />
    </div>
  );
}
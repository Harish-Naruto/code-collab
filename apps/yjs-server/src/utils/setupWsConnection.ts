// setupWSConnection.ts
import * as Y from 'yjs';
import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate } from 'y-protocols/awareness';
import { applyUpdate, encodeStateAsUpdate } from 'yjs';

const docs = new Map<string, { doc: Y.Doc; awareness: Awareness; clients: Set<WebSocket> }>();
const messageSync = 0;
const messageAwareness = 1;

export function setupWSConnection(ws: WebSocket, req: IncomingMessage) {
  const roomName = new URL(req.url || '', 'http://localhost').pathname.slice(1) || 'default';
  const { doc, awareness, clients } = getYDoc(roomName);
  
  clients.add(ws);

  const awarenessHandler = ({ added, updated, removed }: { added: number[], updated: number[], removed: number[] }) => {
    const changedClients = added.concat(updated, removed);
    if (changedClients.length > 0) {
      try {
        const awarenessUpdate = encodeAwarenessUpdate(awareness, changedClients);
        broadcast(clients, messageAwareness, awarenessUpdate, ws);
      } catch (error) {
        console.error('Error in awareness handler:', error);
      }
    }
  };

  awareness.on('update', awarenessHandler);

  ws.on('message', (message: Buffer) => {
    try {
      const messageType = message[0];
      const data = message.subarray(1);

      if (messageType === messageSync) {
        applyUpdate(doc, new Uint8Array(data));
        broadcast(clients, messageSync, data, ws);
      } else if (messageType === messageAwareness) {
        applyAwarenessUpdate(awareness, data, 'websocket');
        
      }
    } catch (error) {
      console.error('Error handling message:', error);
      console.error('Message type:', message[0]);
      console.error('Message length:', message.length);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    awareness.off('update', awarenessHandler);
    
    if (clients.size === 0) {
      docs.delete(roomName);
      
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  // Send initial document state to new client
  try {
    const syncUpdate = encodeStateAsUpdate(doc);
    if (syncUpdate.length > 0) {
      ws.send(Buffer.concat([Buffer.from([messageSync]), syncUpdate]));
    }
  } catch (error) {
    console.error('Error sending initial document state:', error);
  }

  // Send current awareness state to new client
  try {
    const awarenessStates = Array.from(awareness.getStates().keys());
    if (awarenessStates.length > 0) {
      const awarenessUpdate = encodeAwarenessUpdate(awareness, awarenessStates);
      if (awarenessUpdate.length > 0) {
        ws.send(Buffer.concat([Buffer.from([messageAwareness]), awarenessUpdate]));
      }
    }
  } catch (error) {
    console.error('Error sending initial awareness state:', error);
  }
}

// Helper to get or create room
function getYDoc(room: string) {
  if (!docs.has(room)) {
    const doc = new Y.Doc();
    const awareness = new Awareness(doc);
    const clients = new Set<WebSocket>();    
    docs.set(room, { doc, awareness, clients });
  }
  return docs.get(room)!;
}

// Broadcast to all clients in room except sender
function broadcast(clients: Set<WebSocket>, type: number, payload: Uint8Array, exclude?: WebSocket) {
  const message = Buffer.concat([Buffer.from([type]), payload]);
  let successCount = 0;
  let errorCount = 0;
  
  for (const client of clients) {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      try {
        client.send(message);
        successCount++;
      } catch (error) {
        console.error('Error sending message to client:', error);
        errorCount++;
      }
    }
  }
}


export interface CollaborativeEditorProps {
  roomId: string;
  userName?: string;
  wsUrl?: string;
}

export interface UserState {
  name: string;
  color: string;
}

export interface CursorState {
  anchor: { line: number; column: number };
  head: { line: number; column: number };
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface ConnectionState {
  status: ConnectionStatus;
  error?: string;
}

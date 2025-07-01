
import http from 'http';
import { WebSocketServer } from 'ws';
import { setupWSConnection } from './utils/setupWsConnection';

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  setupWSConnection(ws, req);
});

const PORT = 1234;
server.listen(PORT, () => {
  console.log(`WebSocket server running at ws://localhost:${PORT}`);
});
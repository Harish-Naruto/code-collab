import * as yjs from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const doc = new yjs.Doc();

const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc);

console.log('Yjs WebSocket provider started on ws://localhost:1234');

wsProvider.on('status', (event) => {
  console.log(`WebSocket status: ${event.status}`);
});
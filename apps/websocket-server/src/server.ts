import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { handleConnection } from './ws/connection';

const app =  express();
const server = createServer(app);
const wss = new WebSocketServer({server});

wss.on('connection',handleConnection);

server.listen(8080,()=>{
  console.log('chat server is runnig on port 8080');
})

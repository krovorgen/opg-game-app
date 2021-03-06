import Fastify, { FastifyInstance } from 'fastify';
import websocketPlugin, { SocketStream } from '@fastify/websocket';

import configuration from './config/configuration';
import { messagesRepository, MessagesType } from './repositories/messages-repository';
import { runDb } from './repositories/db';

const server: FastifyInstance = Fastify({ logger: true });

server.register(websocketPlugin, {
  options: {
    maxPayload: 1048576,
  },
});

server.register(async function (fastify: FastifyInstance) {
  fastify.get('/chat', { websocket: true }, async (connection: SocketStream) => {
    connection.socket.on('message', async (message) => {
      const newMessageDto: MessagesType = JSON.parse(message.toString());
      switch (newMessageDto.event) {
        case 'message':
          await messagesRepository.create(newMessageDto);
          broadcastMessage([newMessageDto]);
          break;
        case 'connection':
          connection.socket.send(JSON.stringify({ messages: await messagesRepository.get() }));
          broadcastMessage([newMessageDto]);
          break;
      }
    });
  });
});

const broadcastMessage = (messages: MessagesType[]) => {
  server.websocketServer.clients.forEach((client) => {
    client.send(JSON.stringify({ messages }));
  });
};

server.listen({ port: +configuration().PORT, host: '0.0.0.0' }, async (err, address) => {
  await runDb();
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});

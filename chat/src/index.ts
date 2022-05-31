import ws from 'ws';
import { messagesRepository, MessagesType } from './repositories/messages-repository';
import { runDb } from './repositories/db';

const wss = new ws.Server({ port: 4300 }, () => console.log(`Server started on 4300`));

wss.on('connection', async function (ws) {
  await runDb();
  ws.send(JSON.stringify({ messages: await messagesRepository.get() }));
  ws.on('message', async function (message: MessagesType) {
    message = JSON.parse(message as unknown as string);
    switch (message.event) {
      case 'message':
        await messagesRepository.create(message);
        broadcastMessage([message]);
        break;
      case 'connection':
        broadcastMessage([message]);
        break;
    }
  });
});

const broadcastMessage = (messages: MessagesType[]) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ messages }));
  });
};

import { client } from './db';
import { ObjectId } from 'mongodb';

export type MessagesType = {
  event: string;
  date: Date;
  nickname: string;
  message: string;
};

export let messages = client.db('test').collection<MessagesType>('messages');

export const messagesRepository = {
  async getCountMessages(): Promise<number> {
    return await messages.countDocuments();
  },
  async get(): Promise<MessagesType[]> {
    return await messages.find({}, { projection: { _id: 0 } }).toArray();
  },
  async create(newMessageDto: MessagesType): Promise<void> {
    const newMessage: MessagesType & { _id?: ObjectId } = {
      ...newMessageDto,
    };
    await messages.insertOne(newMessage);
  },
};

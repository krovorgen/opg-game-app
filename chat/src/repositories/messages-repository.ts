import { client } from './db';
import { ObjectId } from 'mongodb';

export enum UserRoleType {
  admin = 'ADMIN',
  user = 'USER',
  moderator = 'MODERATOR',
}

export type MessagesType = {
  event: string;
  date: Date;
  nickname: string;
  message: string;
  role: UserRoleType;
};

export let messages = client.db('test').collection<MessagesType>('messages');

export const messagesRepository = {
  async getCountMessages(): Promise<number> {
    return await messages.countDocuments();
  },
  async get(): Promise<MessagesType[]> {
    const countMessages = await this.getCountMessages();
    const skipMessages = countMessages > 20 ? countMessages - 20 : 0;
    return await messages.find({}, { projection: { _id: 0 }, limit: 20, skip: skipMessages }).toArray();
  },
  async create(newMessageDto: MessagesType): Promise<void> {
    const newMessage: MessagesType & { _id?: ObjectId } = {
      ...newMessageDto,
    };
    await messages.insertOne(newMessage);
  },
};

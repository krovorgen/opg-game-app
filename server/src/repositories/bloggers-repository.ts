import { client } from './db';
import { ObjectId } from 'mongodb';

export type BloggersType = {
  id: number;
  name: string;
  youtubeUrl: string;
};

export let bloggers = client.db('test').collection<BloggersType>('bloggers');

export const bloggersRepository = {
  async get(): Promise<BloggersType[]> {
    return await bloggers.find({}, { projection: { _id: 0 } }).toArray();
  },
  async getById(id: string): Promise<BloggersType | null> {
    return await bloggers.findOne({ id: +id }, { projection: { _id: 0 } });
  },
  async updateById(id: string, name: string, youtubeUrl: string): Promise<void> {
    await bloggers.updateOne({ id: +id }, { $set: { name, youtubeUrl } });
  },
  async create(name: string, youtubeUrl: string): Promise<BloggersType> {
    const newBlogger: BloggersType & { _id?: ObjectId } = {
      id: +new Date(),
      name,
      youtubeUrl,
    };
    await bloggers.insertOne(newBlogger);
    delete newBlogger['_id'];
    return newBlogger;
  },
  async deleteById(id: string): Promise<void> {
    await bloggers.deleteOne({ id: +id });
  },
};

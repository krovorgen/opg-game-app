import { MongoClient } from 'mongodb';
import { settings } from '../helpers/settings';

const host = settings.MONGO_URL;
const mongoUri = `mongodb://${host}/test`;

export const client = new MongoClient(mongoUri);

export async function runDb() {
  try {
    await client.connect();
    await client.db('test').command({ ping: 1 });
    console.log('Connected successfully to mongo server');
  } catch {
    console.log("Can't connect to db");
    await client.close();
  }
}

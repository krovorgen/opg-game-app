import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import configuration from '../config/configuration';

dotenv.config();
const mongoUri = `mongodb://${configuration().database.MONGO_URL}/test`;
export const client = new MongoClient(mongoUri);

export async function runDb() {
  try {
    await client.connect();
    console.log('Connected successfully to mongo server');
  } catch {
    console.log("Can't connect to db");
    await client.close();
  }
}

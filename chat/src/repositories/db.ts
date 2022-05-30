import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import configuration from '../config/configuration';

dotenv.config();
const mongoUri = `mongodb://${configuration().database.MONGO_URL}/test`;
export const client = new MongoClient(mongoUri);

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    console.log('Connected successfully to mongo server');
  } catch {
    console.log("Can't connect to db");
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

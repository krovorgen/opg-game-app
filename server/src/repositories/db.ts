import { MongoClient } from 'mongodb';
import { settings } from '../helpers/settings';

const host = settings.MONGO_URL;
const mongoUri = `mongodb://${host}/test`;

export const client = new MongoClient(mongoUri);

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db('test').command({ ping: 1 });
    console.log('Connected successfully to mongo server');
  } catch {
    console.log("Can't connect to db");
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

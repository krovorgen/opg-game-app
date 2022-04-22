import { MongoClient } from 'mongodb';

const host = process.env.MONGO_URL || 'localhost';
const mongoUri = `mongodb://${host}/heroes`;

const options = { useNewUrlParser: true };

// @ts-ignore
export const client = new MongoClient(mongoUri, options);

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

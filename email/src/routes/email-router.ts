import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function emailRouter(fastify: FastifyInstance, options: Record<any, any>) {
  const users = fastify.mongo.db!.collection('users')

  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const usersFounded = await users.find({}, { projection: { _id: 0 } }).toArray();
    return { users: usersFounded };
  });

  fastify.get('/hello',   async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });
}

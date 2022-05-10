import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function emailRouter(fastify: FastifyInstance, options: Record<any, any>) {
  const users = fastify.mongo.db!.collection('users');

  const emailSendJsonSchema = {
    type: 'object',
    required: ['email', 'message', 'subject'],
    properties: {
      email: { type: 'string' },
      message: { type: 'string' },
      subject: { type: 'string', maxLength: 32 },
    },
  };

  fastify.post(
    '/api/email/send',
    { schema: { body: emailSendJsonSchema } },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const usersFounded = await users.find({}, { projection: { _id: 0 } }).toArray();
      return { users: usersFounded };
    }
  );

  fastify.get('/api/hello', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });
}

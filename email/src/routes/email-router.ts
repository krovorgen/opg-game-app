import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { emailService } from '../services/email-service';

export async function emailRouter(fastify: FastifyInstance, options: Record<any, any>) {
  const emailSendJsonSchema = {
    type: 'object',
    required: ['email'],
    properties: { email: { type: 'string' } },
  };

  fastify.post(
    '/api/email/recovery-password',
    { schema: { body: emailSendJsonSchema } },
    emailService.recoveryPassword
  );

  fastify.get('/api/hello', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });
}

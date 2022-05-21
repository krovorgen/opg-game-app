import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { emailService } from '../services/email-service';

export async function emailRouter(fastify: FastifyInstance, options: Record<any, any>) {
  const emailSendJsonSchema = {
    type: 'object',
    required: ['email'],
    properties: { email: { type: 'string' } },
  };

  fastify.post(
    '/api/email/password-recovery',
    { schema: { body: emailSendJsonSchema } },
    emailService.recoveryPassword
  );
}

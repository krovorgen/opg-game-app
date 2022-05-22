import { FastifyInstance } from 'fastify';
import { emailService } from '../services/email-service';

export async function emailRouter(fastify: FastifyInstance) {
  const emailSendJsonSchema = {
    type: 'object',
    required: ['email', 'recoveryCode'],
    properties: {
      email: { type: 'string' },
      recoveryCode: { type: 'string' },
    },
  };

  fastify.post(
    '/api/email/password-recovery',
    { schema: { body: emailSendJsonSchema } },
    emailService.recoveryPassword
  );
}

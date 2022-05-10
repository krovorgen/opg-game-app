import 'dotenv/config';
import fastify from 'fastify';
import { emailRouter } from './routes/email-router';
import { settings } from './helpers/settings';
import { localize, SchemaValidationError } from './helpers/localizeError';
import { FastifySchemaValidationError } from 'fastify/types/schema';
import { runDb } from './repositories/db';

const app = fastify({
  logger: true,
  schemaErrorFormatter: (errors: FastifySchemaValidationError[], dataVar) => {
    localize(errors as SchemaValidationError[]);
    const myErrorMessage = errors.map((error) => error.message!.trim()).join(', ');
    return new Error(myErrorMessage);
  },
});

app.register(emailRouter);

const startApp = async () => {
  await runDb();

  app.listen({ port: +settings.PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`Server is now listening on ${address}`);
  });
};

startApp();

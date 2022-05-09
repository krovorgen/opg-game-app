import 'dotenv/config'
import fastify from 'fastify';
import { emailRouter } from './routes/email-router';
import { dbConnector } from './repositories/dbConnector';
import {settings} from "./helpers/settings";

const app = fastify({
  logger: true,
});

app.register(dbConnector);
app.register(emailRouter);

app.listen({ port: +settings.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});

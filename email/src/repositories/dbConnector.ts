import { FastifyInstance } from 'fastify';
import fastifyMongo from '@fastify/mongodb';
import fastifyPlugin from 'fastify-plugin';
import {settings} from "../helpers/settings";

const mongoUri = `mongodb://${settings.MONGO_URL}/test`;

export const dbConnector = fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.register(fastifyMongo, {
    url: mongoUri,
  });
});

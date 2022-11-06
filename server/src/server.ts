import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { pollRoutes } from './routes/poll';
import { gameRoutes } from './routes/game';
import { guessRoutes } from './routes/guess';
import { userRoutes } from './routes/user';
import { authRoutes } from './routes/auth';

// singleton: Pattern que uma função não precisa ser criada, apenas reaproveitada entre os arquivos


async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  //Em produção, o secret precisa ser uma variável ambiente

  await fastify.register(jwt, {
    secret: 'nlw-copa',
  })

  await fastify.register(gameRoutes);
  await fastify.register(pollRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);
  await fastify.register(authRoutes);



  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()
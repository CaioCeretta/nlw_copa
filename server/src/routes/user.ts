import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify';
import ShortUniqueId from 'short-unique-id';
import { prisma } from '../lib/prisma';


export async  function userRoutes(fastify: FastifyInstance) {
  
  fastify.get('/users/count', async () => {
    const count = await prisma.user.count();

    return { count }
  })

}
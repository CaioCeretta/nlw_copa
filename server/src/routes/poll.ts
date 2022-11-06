import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify';
import ShortUniqueId from 'short-unique-id';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';
import { userRoutes } from './user';


export async function pollRoutes(fastify: FastifyInstance) {
  
  fastify.get('/polls/count', async () => {
    const count = await prisma.poll.count();

    return { count }
  })

  
  fastify.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
    });

    const { title } = createPollBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()

    const ownerId = null;

    try {
      await request.jwtVerify()

      await prisma.poll.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub, 
            }
          }
        }
      })
      
    } catch {
      await prisma.poll.create({
        data: {
          title,
          code
        }
      })
      
    }



    return reply.status(201).send({ code })
    // return { title }
  })

  fastify.post('/polls/join', {
    onRequest: [authenticate]
  }, async(req, rep) => {
    const joinPollBody = z.object({
      code: z.string(),
    });

    const { code } = joinPollBody.parse(req.body);

    const poll = await prisma.poll.findUnique({
      where: {
        code,
      },
      include: {
        participants: {
          where: {
            userId: req.user.sub
          }
        }
      }
    })

    if (!poll){
      return rep.status(400).send({
        msg: 'Pool Not Found'
      })
    }

    if(poll.participants.length > 0) {
      return rep.status(400).send({
        msg: 'You already joined this poll'
      })
    }

    if(!poll.ownerId) {
      await prisma.poll.update({
        where: {
          id: poll.id,
        },
        data: {
          ownerId: req.user.sub
        }
        
      })
    }

    await prisma.participant.create({
      data: {
        pollId: poll.id,
        userId: req.user.sub
      }
    })

    return rep.status(201).send();

  })

  fastify.get('/polls', {
    onRequest: [authenticate]
  }, async (req) => {

    const polls = await prisma.poll.findMany({
      where: {
        participants: {
          some: {
            userId: req.user.sub
          }
        }
      },
      include: {
        _count: {
          select: {
            participants: true
          }
        },
        participants: {
          select: {
            id:true,

            user: {
              select: {
                avatarUrl: true
              }
            }
          },
          take: 4,
        },
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return { polls }
  })

  fastify.get('/polls/:id', {
    onRequest: [authenticate]
  }, async (req) => {
    const getPollParams = z.object({
      id: z.string(),
    })

    const { id } = getPollParams.parse(req.params)

    const poll = await prisma.poll.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            participants: true
          }
        },
        participants: {
          select: {
            id:true,

            user: {
              select: {
                avatarUrl: true
              }
            }
          },
          take: 4,
        },
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return poll
  }) 

}


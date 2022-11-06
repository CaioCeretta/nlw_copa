import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient;

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatarUrl: 'https://github.com/diego3g.png',
    }
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Example Poll',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-05T01:09:00.748Z',
      firstTeamCountryCode: 'BE',
      secondTeamCountryCode: 'DN',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-10T01:09:00.748Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'FR',

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              }
            }
          }
        }
      }
    }
  })

}

main()
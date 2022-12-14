import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient;

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Jorge',
      email: 'jorge@gmail.com',
      avatarUrl: 'https://github.com/---.png',
    }
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'New Example Poll',
      code: 'BOL456',
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
      date: '2022-11-10T01:09:00.748Z',
      firstTeamCountryCode: 'BE',
      secondTeamCountryCode: 'DN',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-10T01:09:00.748Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'FR',

      
    }
  })

}

main()
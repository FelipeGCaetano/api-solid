import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    nome: 'Felipe Gabriel',
    email: 'felipecaetano2003#gmail.com',
  },
})

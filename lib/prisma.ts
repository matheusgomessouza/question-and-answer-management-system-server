import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL or DIRECT_URL must be set')
}

const adapter = new PrismaPg({
  connectionString,
})

export const prisma = new PrismaClient({
  adapter,
})

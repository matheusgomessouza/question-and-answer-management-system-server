import { prisma } from '../../lib/prisma.js'
import { Question, UUID } from '@/models/types.js'
import { AppError } from '@/middleware/errorHandler.js'
import { CreateQuestionInput, UpdateQuestionInput } from '@/validators/questionSchemas.js'

function isPrismaNotFoundError(err: unknown): err is { code?: string } {
  return typeof err === 'object' && err !== null && 'code' in err && (err as any).code === 'P2025'
}

export class QuestionsRepository {
  async getAll(): Promise<Question[]> {
    return prisma.question.findMany({
      orderBy: { order: 'asc' },
      include: { answers: { orderBy: { order: 'asc' } } },
    })
  }

  async getById(id: UUID): Promise<Question | null> {
    try {
      const question = await prisma.question.findUnique({
        where: { id },
        include: { answers: { orderBy: { order: 'asc' } } },
      })
      return question
    } catch (error) {
      throw new AppError('Error retrieving question', 500)
    }
  }

  async create(data: CreateQuestionInput): Promise<Question> {
    const { answerIds = [], ...questionData } = data
    return prisma.question.create({
      data: {
        ...questionData,
        ...(answerIds.length ? { answers: { connect: answerIds.map(id => ({ id })) } } : {}),
      },
      include: { answers: { orderBy: { order: 'asc' } } },
    })
  }

  async update(id: UUID, data: UpdateQuestionInput): Promise<Question> {
    try {
      const { answerIds, ...questionData } = data
      const updated = await prisma.question.update({
        where: { id },
        data: {
          ...questionData,
          ...(answerIds !== undefined
            ? { answers: { set: answerIds.map(answerId => ({ id: answerId })) } }
            : {}),
        },
        include: { answers: { orderBy: { order: 'asc' } } },
      })
      return updated
    } catch (err: unknown) {
      if (isPrismaNotFoundError(err)) {
        throw new AppError('Question not found', 404)
      }
      throw err
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      await prisma.question.delete({ where: { id } })
    } catch (err: unknown) {
      if (isPrismaNotFoundError(err)) {
        throw new AppError('Question not found', 404)
      }
      throw err
    }
  }
}

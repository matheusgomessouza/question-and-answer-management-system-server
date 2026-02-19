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

    const existingQuestion = await prisma.question.findFirst({
      where: { order: questionData.order },
    })

    if (existingQuestion) {
      throw new AppError('A question with this order already exists', 409)
    }

    if (answerIds.length > 0) {
      const inactiveAnswers = await prisma.answer.findMany({
        where: { id: { in: answerIds }, active: false },
      })

      if (inactiveAnswers.length > 0) {
        throw new AppError('Cannot associate inactive answers with a question', 400)
      }
    }

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

      const currentQuestion = await prisma.question.findUnique({
        where: { id },
      })

      if (!currentQuestion) {
        throw new AppError('Question not found', 404)
      }

      if (!currentQuestion.active) {
        const isOnlyActivating =
          Object.keys(questionData).length === 1 && questionData.active === true
        const hasAnswerIds = answerIds !== undefined && answerIds.length > 0

        if (!isOnlyActivating || hasAnswerIds) {
          throw new AppError(
            'Inactive questions can only be activated. Other fields, including description, order, and answers, cannot be modified.',
            400
          )
        }
      }

      if (currentQuestion.active && answerIds !== undefined && answerIds.length > 0) {
        const inactiveAnswers = await prisma.answer.findMany({
          where: { id: { in: answerIds }, active: false },
        })

        if (inactiveAnswers.length > 0) {
          throw new AppError('Cannot associate inactive answers with a question', 400)
        }
      }

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

import { prisma } from '../../lib/prisma.js'
import { Answer, UUID } from '@/models/types.js'
import { CreateAnswerInput, UpdateAnswerInput } from '@/validators/answerSchemas.js'
import { AppError } from '@/middleware/errorHandler.js'

export class AnswersRepository {
  async getAll(): Promise<Answer[]> {
    return prisma.answer.findMany()
  }

  async getById(id: UUID): Promise<Answer | null> {
    const answer = await prisma.answer.findUnique({ where: { id } })
    if (!answer) {
      throw new AppError('Answer not found', 404)
    }
    return answer
  }

  async create(data: CreateAnswerInput): Promise<Answer> {
    return prisma.answer.create({ data })
  }

  async update(id: UUID, data: UpdateAnswerInput): Promise<Answer> {
    const updated = await prisma.answer.update({ where: { id }, data })
    if (!updated) {
      throw new AppError('Answer not found', 404)
    }
    return updated
  }

  async delete(id: UUID): Promise<void> {
    const questions = await prisma.question.findMany({
      where: { answers: { some: { id } } },
      select: { id: true },
    })

    await Promise.all(
      questions.map((q: { id: string }) =>
        prisma.question.update({
          where: { id: q.id },
          data: { answers: { disconnect: { id } } },
        })
      )
    )

    const deleted = await prisma.answer.delete({ where: { id } })

    if (!deleted) {
      throw new AppError('Answer not found', 404)
    }
  }
}

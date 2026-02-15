import { v4 as uuidv4 } from 'uuid'
import { database } from '../storage/database.js'
import { Answer, UUID } from '../models/types.js'
import { CreateAnswerInput, UpdateAnswerInput } from '../validators/answerSchemas.js'
import { AppError } from '../middleware/errorHandler.js'

export const answerService = {
  async getAll(): Promise<Answer[]> {
    return database.getAllAnswers()
  },

  async getById(id: UUID): Promise<Answer> {
    const answer = await database.getAnswerById(id)
    if (!answer) {
      throw new AppError('Answer not found', 404)
    }
    return answer
  },

  async create(data: CreateAnswerInput): Promise<Answer> {
    const answer: Answer = {
      id: uuidv4(),
      description: data.description,
      active: data.active ?? true,
      order: data.order ?? 0,
    }
    return database.createAnswer(answer)
  },

  async update(id: UUID, data: UpdateAnswerInput): Promise<Answer> {
    const updated = await database.updateAnswer(id, data)
    if (!updated) {
      throw new AppError('Answer not found', 404)
    }
    return updated
  },

  async delete(id: UUID): Promise<void> {
    // First, remove this answer from all questions (cascading delete)
    const questions = await database.getAllQuestions()
    const updatedQuestions = questions.map(q => ({
      ...q,
      answerIds: q.answerIds.filter(answerId => answerId !== id),
    }))
    await database.updateAllQuestions(updatedQuestions)

    // Then delete the answer
    const deleted = await database.deleteAnswer(id)
    if (!deleted) {
      throw new AppError('Answer not found', 404)
    }
  },
}

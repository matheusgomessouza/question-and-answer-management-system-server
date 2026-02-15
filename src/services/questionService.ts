import { v4 as uuidv4 } from 'uuid'
import { database } from '../storage/database.js'
import { Question, UUID } from '../models/types.js'
import {
  CreateQuestionInput,
  UpdateQuestionInput,
  AssociateAnswersInput,
} from '../validators/questionSchemas.js'
import { AppError } from '../middleware/errorHandler.js'

export const questionService = {
  async getAll(): Promise<Question[]> {
    return database.getAllQuestions()
  },

  async getById(id: UUID): Promise<Question> {
    const question = await database.getQuestionById(id)
    if (!question) {
      throw new AppError('Question not found', 404)
    }
    return question
  },

  async create(data: CreateQuestionInput): Promise<Question> {
    // Validate that all answer IDs exist
    if (data.answerIds && data.answerIds.length > 0) {
      const answers = await database.getAllAnswers()
      const answerIds = new Set(answers.map(a => a.id))
      const invalidIds = data.answerIds.filter(id => !answerIds.has(id))
      if (invalidIds.length > 0) {
        throw new AppError(`Invalid answer IDs: ${invalidIds.join(', ')}`, 400)
      }
    }

    const question: Question = {
      id: uuidv4(),
      description: data.description,
      active: data.active ?? true,
      order: data.order ?? 0,
      answerIds: data.answerIds ?? [],
    }
    return database.createQuestion(question)
  },

  async update(id: UUID, data: UpdateQuestionInput): Promise<Question> {
    // Validate answer IDs if provided
    if (data.answerIds && data.answerIds.length > 0) {
      const answers = await database.getAllAnswers()
      const answerIds = new Set(answers.map(a => a.id))
      const invalidIds = data.answerIds.filter(id => !answerIds.has(id))
      if (invalidIds.length > 0) {
        throw new AppError(`Invalid answer IDs: ${invalidIds.join(', ')}`, 400)
      }
    }

    const updated = await database.updateQuestion(id, data)
    if (!updated) {
      throw new AppError('Question not found', 404)
    }
    return updated
  },

  async delete(id: UUID): Promise<void> {
    const deleted = await database.deleteQuestion(id)
    if (!deleted) {
      throw new AppError('Question not found', 404)
    }
  },

  async associateAnswers(id: UUID, data: AssociateAnswersInput): Promise<Question> {
    // Validate that all answer IDs exist
    const answers = await database.getAllAnswers()
    const answerIds = new Set(answers.map(a => a.id))
    const invalidIds = data.answerIds.filter(id => !answerIds.has(id))
    if (invalidIds.length > 0) {
      throw new AppError(`Invalid answer IDs: ${invalidIds.join(', ')}`, 400)
    }

    const question = await this.getById(id)
    const updated = await database.updateQuestion(id, {
      answerIds: [...new Set([...question.answerIds, ...data.answerIds])],
    })

    if (!updated) {
      throw new AppError('Failed to associate answers', 500)
    }
    return updated
  },
}

import { Question, UUID } from '../models/types.js'
import { CreateQuestionInput, UpdateQuestionInput } from '../validators/questionSchemas.js'
import { AppError } from '../middleware/errorHandler.js'
import { QuestionsRepository } from '../repositories/questions-repository.js'

export class QuestionService {
  async getAll(): Promise<Question[]> {
    try {
      const questionsRepo = new QuestionsRepository()
      return await questionsRepo.getAll()
    } catch (error) {
      throw new AppError('Error retrieving questions', 500)
    }
  }

  async getById(id: UUID): Promise<Question | null> {
    try {
      const questionsRepo = new QuestionsRepository()
      return await questionsRepo.getById(id)
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        throw error
      }
      throw new AppError('Error retrieving question', 500)
    }
  }

  async create(data: CreateQuestionInput): Promise<Question> {
    try {
      const questionsRepo = new QuestionsRepository()
      return await questionsRepo.create(data)
    } catch (error) {
      throw new AppError('Error creating question', 500)
    }
  }

  async update(id: UUID, data: UpdateQuestionInput): Promise<Question> {
    try {
      const questionsRepo = new QuestionsRepository()
      return await questionsRepo.update(id, data)
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        throw error
      }
      throw new AppError('Error updating question', 500)
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      const questionsRepo = new QuestionsRepository()
      await questionsRepo.delete(id)
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        throw error
      }
      throw new AppError('Error deleting question', 500)
    }
  }
}

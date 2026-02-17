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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw new AppError('Error retrieving questions: ' + errorMessage, 500)
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw new AppError('Error retrieving question: ' + errorMessage, 500)
    }
  }

  async create(data: CreateQuestionInput): Promise<Question> {
    try {
      const questionsRepo = new QuestionsRepository()
      return await questionsRepo.create(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw new AppError('Error creating question: ' + errorMessage, 500)
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw new AppError('Error updating question: ' + errorMessage, 500)
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw new AppError('Error deleting question: ' + errorMessage, 500)
    }
  }
}

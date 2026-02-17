import { AppError } from '@/middleware/errorHandler.js'
import { Answer, UUID } from '@/models/types'
import { AnswersRepository } from '@/repositories/answers-repository.js'
import { CreateAnswerInput, UpdateAnswerInput } from '@/validators/answerSchemas'

export class AnswerService {
  async getAll(): Promise<Answer[]> {
    try {
      const answersRepo = new AnswersRepository()
      return await answersRepo.getAll()
    } catch (error) {
      throw new AppError('Error retrieving answers', 500)
    }
  }

  async getById(id: UUID): Promise<Answer | null> {
    try {
      const answersRepo = new AnswersRepository()
      return await answersRepo.getById(id)
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        throw error
      }
      throw new AppError('Error retrieving answer', 500)
    }
  }

  async create(data: CreateAnswerInput): Promise<Answer> {
    try {
      const answersRepo = new AnswersRepository()
      return await answersRepo.create(data)
    } catch (error) {
      throw new AppError('Error creating answer', 500)
    }
  }

  async update(id: UUID, data: UpdateAnswerInput): Promise<Answer> {
    try {
      const answersRepo = new AnswersRepository()
      return await answersRepo.update(id, data)
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        throw error
      }
      throw new AppError('Error updating answer', 500)
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      const answersRepo = new AnswersRepository()
      await answersRepo.delete(id)
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        throw error
      }
      throw new AppError('Error deleting answer', 500)
    }
  }
}

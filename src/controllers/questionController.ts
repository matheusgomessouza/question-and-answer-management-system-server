import { Request, Response, NextFunction } from 'express'
import { QuestionService } from '../services/questionService.js'
import { createQuestionSchema, updateQuestionSchema } from '../validators/questionSchemas.js'

export class QuestionController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const service = new QuestionService()
      const questions = await service.getAll()
      res.status(200).json({ success: true, data: questions })
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const service = new QuestionService()
      const question = await service.getById(id)
      res.status(200).json({ success: true, data: question })
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createQuestionSchema.parse(req.body)
      const service = new QuestionService()
      const question = await service.create(data)
      res.status(201).json({ success: true, data: question })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = updateQuestionSchema.parse(req.body)
      const service = new QuestionService()
      const question = await service.update(id, data)
      res.status(200).json({ success: true, data: question })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const service = new QuestionService()
      await service.delete(id)
      res.status(204).json({ success: true, message: 'Question deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

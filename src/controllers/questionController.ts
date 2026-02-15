import { Request, Response, NextFunction } from 'express'
import { questionService } from '../services/questionService.js'
import {
  createQuestionSchema,
  updateQuestionSchema,
  questionIdParamSchema,
  associateAnswersSchema,
} from '../validators/questionSchemas.js'

export const questionController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const questions = await questionService.getAll()
      res.json({ success: true, data: questions })
    } catch (error) {
      next(error)
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = questionIdParamSchema.parse(req.params)
      const question = await questionService.getById(id)
      res.json({ success: true, data: question })
    } catch (error) {
      next(error)
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createQuestionSchema.parse(req.body)
      const question = await questionService.create(data)
      res.status(201).json({ success: true, data: question })
    } catch (error) {
      next(error)
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = questionIdParamSchema.parse(req.params)
      const data = updateQuestionSchema.parse(req.body)
      const question = await questionService.update(id, data)
      res.json({ success: true, data: question })
    } catch (error) {
      next(error)
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = questionIdParamSchema.parse(req.params)
      await questionService.delete(id)
      res.json({ success: true, message: 'Question deleted successfully' })
    } catch (error) {
      next(error)
    }
  },

  async associateAnswers(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = questionIdParamSchema.parse(req.params)
      const data = associateAnswersSchema.parse(req.body)
      const question = await questionService.associateAnswers(id, data)
      res.json({ success: true, data: question })
    } catch (error) {
      next(error)
    }
  },
}

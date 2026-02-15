import { Request, Response, NextFunction } from 'express'
import { answerService } from '../services/answerService.js'
import {
  createAnswerSchema,
  updateAnswerSchema,
  answerIdParamSchema,
} from '../validators/answerSchemas.js'

export const answerController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const answers = await answerService.getAll()
      res.json({ success: true, data: answers })
    } catch (error) {
      next(error)
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = answerIdParamSchema.parse(req.params)
      const answer = await answerService.getById(id)
      res.json({ success: true, data: answer })
    } catch (error) {
      next(error)
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createAnswerSchema.parse(req.body)
      const answer = await answerService.create(data)
      res.status(201).json({ success: true, data: answer })
    } catch (error) {
      next(error)
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = answerIdParamSchema.parse(req.params)
      const data = updateAnswerSchema.parse(req.body)
      const answer = await answerService.update(id, data)
      res.json({ success: true, data: answer })
    } catch (error) {
      next(error)
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = answerIdParamSchema.parse(req.params)
      await answerService.delete(id)
      res.json({ success: true, message: 'Answer deleted successfully' })
    } catch (error) {
      next(error)
    }
  },
}

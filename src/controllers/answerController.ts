import { Request, Response, NextFunction } from 'express'
import { AnswerService } from '../services/answerService.js'
import { createAnswerSchema, updateAnswerSchema } from '../validators/answerSchemas.js'

export class AnswerController {
  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const service = new AnswerService()
      const answers = await service.getAll()
      res.status(200).json(answers)
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const service = new AnswerService()
      const answer = await service.getById(id)
      res.status(200).json(answer)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createAnswerSchema.parse(req.body)
      const service = new AnswerService()
      const newAnswer = await service.create(data)
      res.status(201).json(newAnswer)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = updateAnswerSchema.parse(req.body)
      const service = new AnswerService()
      const updatedAnswer = await service.update(id, data)
      res.status(200).json(updatedAnswer)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const service = new AnswerService()
      await service.delete(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

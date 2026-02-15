import { z } from 'zod'

export const createAnswerSchema = z.object({
  description: z.string().min(1, 'Description is required').max(500),
  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export const updateAnswerSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  active: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
})

export const answerIdParamSchema = z.object({
  id: z.string().uuid('Invalid answer ID format'),
})

export type CreateAnswerInput = z.infer<typeof createAnswerSchema>
export type UpdateAnswerInput = z.infer<typeof updateAnswerSchema>

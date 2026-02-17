import { z } from 'zod'

export const createQuestionSchema = z.object({
  description: z.string().min(1, 'Description is required').max(500),
  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  answerIds: z.array(z.string().uuid('Invalid answer ID format')).default([]),
})

export const updateQuestionSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  active: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  answerIds: z.array(z.string().uuid('Invalid answer ID format')).optional(),
})

export const questionIdParamSchema = z.object({
  id: z.string().uuid('Invalid question ID format'),
})

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>

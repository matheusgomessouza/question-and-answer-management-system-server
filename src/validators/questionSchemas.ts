import { z } from 'zod'

export const createQuestionSchema = z.object({
  description: z.string().min(1, 'Description is required').max(500),
  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  answerIds: z.array(z.string().uuid()).default([]),
})

export const updateQuestionSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  active: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  answerIds: z.array(z.string().uuid()).optional(),
})

export const questionIdParamSchema = z.object({
  id: z.string().uuid('Invalid question ID format'),
})

export const associateAnswersSchema = z.object({
  answerIds: z.array(z.string().uuid()).min(1, 'At least one answer ID is required'),
})

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>
export type AssociateAnswersInput = z.infer<typeof associateAnswersSchema>

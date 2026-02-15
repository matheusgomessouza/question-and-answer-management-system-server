import { describe, it, expect, beforeEach } from 'vitest'
import { answerService } from '../src/services/answerService'
import { questionService } from '../src/services/questionService'
import { database } from '../src/storage/database'

describe('Cascading Delete', () => {
  beforeEach(async () => {
    await database.init()
  })

  it('should remove answer from all questions when answer is deleted', async () => {
    // Create an answer
    const answer = await answerService.create({
      description: 'Test Answer',
      active: true,
      order: 0,
    })

    // Create a question with this answer
    const question = await questionService.create({
      description: 'Test Question',
      active: true,
      order: 0,
      answerIds: [answer.id],
    })

    // Verify the question has the answer
    const questionBefore = await questionService.getById(question.id)
    expect(questionBefore.answerIds).toContain(answer.id)

    // Delete the answer
    await answerService.delete(answer.id)

    // Verify the answer is removed from the question
    const questionAfter = await questionService.getById(question.id)
    expect(questionAfter.answerIds).not.toContain(answer.id)
    expect(questionAfter.answerIds).toHaveLength(0)
  })

  it('should validate answer IDs when creating a question', async () => {
    await expect(
      questionService.create({
        description: 'Test Question',
        active: true,
        order: 0,
        answerIds: ['invalid-uuid'],
      })
    ).rejects.toThrow()
  })
})

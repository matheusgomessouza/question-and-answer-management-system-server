import { v4 as uuidv4 } from 'uuid'
import { database } from './database.js'
import { Answer, Question } from '../models/types.js'

// Generate seed data for answers
export function generateSeededAnswers(count: number = 10): Answer[] {
  const answers: Answer[] = []
  const descriptions = [
    'Strongly Agree',
    'Agree',
    'Neutral',
    'Disagree',
    'Strongly Disagree',
    'Yes',
    'No',
    'Maybe',
    'Not Applicable',
    'Prefer not to answer',
    'Excellent',
    'Good',
    'Fair',
    'Poor',
    'Very Poor',
  ]

  for (let i = 0; i < count; i++) {
    answers.push({
      id: uuidv4(),
      description: descriptions[i % descriptions.length] + ` (${i + 1})`,
      active: true,
      order: i,
    })
  }

  return answers
}

// Generate seed data for questions
export function generateSeededQuestions(
  count: number = 5,
  answerIds: string[] = []
): Question[] {
  const questions: Question[] = []
  const descriptions = [
    'How satisfied are you with our service?',
    'Would you recommend us to a friend?',
    'How would you rate the quality of our product?',
    'How easy was it to use our platform?',
    'How would you rate your overall experience?',
    'Do you find our pricing reasonable?',
    'Is our customer support helpful?',
    'Would you purchase from us again?',
    'How likely are you to upgrade your plan?',
    'How clear was the information provided?',
  ]

  for (let i = 0; i < count; i++) {
    // Randomly assign 2-5 answers to each question
    const numAnswers = Math.floor(Math.random() * 4) + 2
    const questionAnswerIds = answerIds
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(numAnswers, answerIds.length))

    questions.push({
      id: uuidv4(),
      description: descriptions[i % descriptions.length],
      active: true,
      order: i,
      answerIds: questionAnswerIds,
    })
  }

  return questions
}

// Main seed function
async function seed() {
  console.log('🌱 Starting database seeding...')

  try {
    await database.init()

    // Clear existing data
    const existingQuestions = await database.getAllQuestions()
    const existingAnswers = await database.getAllAnswers()

    for (const q of existingQuestions) {
      await database.deleteQuestion(q.id)
    }
    for (const a of existingAnswers) {
      await database.deleteAnswer(a.id)
    }

    console.log('✅ Cleared existing data')

    // Create answers first
    const answers = generateSeededAnswers(10)
    for (const answer of answers) {
      await database.createAnswer(answer)
    }
    console.log(`✅ Created ${answers.length} answers`)

    // Create questions with answer associations
    const answerIds = answers.map(a => a.id)
    const questions = generateSeededQuestions(5, answerIds)
    for (const question of questions) {
      await database.createQuestion(question)
    }
    console.log(`✅ Created ${questions.length} questions`)

    console.log('🎉 Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
}

export { seed }

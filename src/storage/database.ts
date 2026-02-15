import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { DatabaseSchema, Answer, Question, UUID } from '../models/types.js'
import { env } from '../config/env.js'

class Database {
  private db: Low<DatabaseSchema> | null = null

  async init() {
    const adapter = new JSONFile<DatabaseSchema>(env.DB_PATH)
    this.db = new Low(adapter, { answers: [], questions: [] })
    await this.db.read()
    await this.db.write()
  }

  private ensureDb() {
    if (!this.db) {
      throw new Error('Database not initialized. Call init() first.')
    }
    return this.db
  }

  // Answer CRUD
  async getAllAnswers(): Promise<Answer[]> {
    const db = this.ensureDb()
    await db.read()
    return db.data.answers
  }

  async getAnswerById(id: UUID): Promise<Answer | undefined> {
    const db = this.ensureDb()
    await db.read()
    return db.data.answers.find(a => a.id === id)
  }

  async createAnswer(answer: Answer): Promise<Answer> {
    const db = this.ensureDb()
    await db.read()
    db.data.answers.push(answer)
    await db.write()
    return answer
  }

  async updateAnswer(id: UUID, updates: Partial<Answer>): Promise<Answer | null> {
    const db = this.ensureDb()
    await db.read()
    const index = db.data.answers.findIndex(a => a.id === id)
    if (index === -1) return null

    db.data.answers[index] = { ...db.data.answers[index], ...updates }
    await db.write()
    return db.data.answers[index]
  }

  async deleteAnswer(id: UUID): Promise<boolean> {
    const db = this.ensureDb()
    await db.read()
    const initialLength = db.data.answers.length
    db.data.answers = db.data.answers.filter(a => a.id !== id)
    await db.write()
    return db.data.answers.length < initialLength
  }

  // Question CRUD
  async getAllQuestions(): Promise<Question[]> {
    const db = this.ensureDb()
    await db.read()
    return db.data.questions
  }

  async getQuestionById(id: UUID): Promise<Question | undefined> {
    const db = this.ensureDb()
    await db.read()
    return db.data.questions.find(q => q.id === id)
  }

  async createQuestion(question: Question): Promise<Question> {
    const db = this.ensureDb()
    await db.read()
    db.data.questions.push(question)
    await db.write()
    return question
  }

  async updateQuestion(id: UUID, updates: Partial<Question>): Promise<Question | null> {
    const db = this.ensureDb()
    await db.read()
    const index = db.data.questions.findIndex(q => q.id === id)
    if (index === -1) return null

    db.data.questions[index] = { ...db.data.questions[index], ...updates }
    await db.write()
    return db.data.questions[index]
  }

  async deleteQuestion(id: UUID): Promise<boolean> {
    const db = this.ensureDb()
    await db.read()
    const initialLength = db.data.questions.length
    db.data.questions = db.data.questions.filter(q => q.id !== id)
    await db.write()
    return db.data.questions.length < initialLength
  }

  // Batch update for cascading deletes
  async updateAllQuestions(questions: Question[]): Promise<void> {
    const db = this.ensureDb()
    await db.read()
    db.data.questions = questions
    await db.write()
  }
}

export const database = new Database()

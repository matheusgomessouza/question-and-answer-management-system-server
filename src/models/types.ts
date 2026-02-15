export type UUID = string

export interface Answer {
  id: UUID
  description: string
  active: boolean
  order: number
}

export interface Question {
  id: UUID
  description: string
  active: boolean
  order: number
  answerIds: UUID[]
}

export interface DatabaseSchema {
  answers: Answer[]
  questions: Question[]
}

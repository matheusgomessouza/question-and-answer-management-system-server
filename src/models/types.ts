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
}

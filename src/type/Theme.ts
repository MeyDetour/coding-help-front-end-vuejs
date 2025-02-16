import type { Question } from '@/type/Question.ts'

export interface Theme {
  author:number,
  contributor_count:number
  id:number
  name:string
  questions_count:number
  questions? : Question[]
}

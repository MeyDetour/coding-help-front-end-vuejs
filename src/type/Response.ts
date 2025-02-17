
import type { Question } from '@/type/Question.ts'

export interface Response {
  author?:number;
  author_data: {username: string, image: string|null}
  content:string
  created_at:string
  downvote_count:number
  id:number
  question:number
  question_data :Question
  upvote_count:number
}

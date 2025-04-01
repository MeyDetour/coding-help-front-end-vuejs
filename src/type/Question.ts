import type { Theme } from '@/type/Theme.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'
import type { User } from '@/type/User.ts'

export interface Question {
  id : number,
  title : string,
  contentHTML? : string,
  contributor_count : number,
  responses_count : number,
  created_at : number,
  isValidate : boolean,
  author : User,
  responses : ApiResponse[],
  themes?:Array<Theme>,
}

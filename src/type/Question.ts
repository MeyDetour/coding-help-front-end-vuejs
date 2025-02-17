import type { Theme } from '@/type/Theme.ts'

export interface Question {
  id : number,
  title : string,
  contributor_count : number,
  responses_count : number,
  isValidate : boolean,
  themes?:Array<Theme>,
}

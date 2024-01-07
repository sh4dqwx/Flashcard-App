import { Question } from "./Question"

export type Test = {
  id: number,
  questions: Question[],
  result: number,
  time: number
}
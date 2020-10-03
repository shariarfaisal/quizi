import { Answer } from "../question.entity";


export interface CreateQuestionDto{
  name: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  answer: Answer
}

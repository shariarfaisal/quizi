import { CreateQuestionDto } from "../dto/create-question.dto";
import { Answer } from "../question.entity";


export const questionValidator = ({ name, optionA, optionB, optionC, optionD, answer }: CreateQuestionDto) => {
  const errors: any = {}

  if(!name) errors.name = 'Name required.'
  if(!optionA) errors.optionA = 'Option A missing.'
  if(!optionB) errors.optionB = 'Option B missing'
  if(!optionC) errors.optionC = 'Option C missing'
  if(!optionD) errors.optionD = 'Option D missing'
  if(!answer) errors.answer = 'Answer required'
  else if(!(answer in Answer)){
    errors.answer = "Invalid answer type."
  }

  return { errors, isValid: Object.keys(errors).length === 0}
}

import { CreateQuizDto } from "../dto/create-quiz.dto"


export const quizValidator = ({ title, duration}: CreateQuizDto) => {
  const errors: any = {}

  if(!title) errors.title = "Title required."
  else if(title.length > 1000) errors.title = "Too long. Limit 1000 characters."

  if(!duration) errors.duration = "Duration missing."
  else if(!Number(duration) || Number(duration) == 0 || Number(duration) < 0) errors.duration = "Invalid Duration. Duration should be a positive number."

  return { errors, isValid: Object.keys(errors).length === 0}
}

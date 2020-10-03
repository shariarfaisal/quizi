import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Quiz } from './quiz.entity'
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { questionValidator } from './validators/question.validator';
import { quizValidator } from './validators/quiz.validator';
import { Question } from './question.entity';


@Injectable()
export class QuizService {

  async createQuiz(dto: CreateQuizDto): Promise<Quiz>{
    const { errors, isValid } = quizValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }

    const { title, duration } = dto
    const quiz = new Quiz()
    quiz.title = title
    quiz.duration = duration
    quiz.questionCount = 0
    quiz.published = false

    await quiz.save()
    return quiz
  }

  async createQuestion(quizID: string, dto: CreateQuestionDto): Promise<Question>{
    const quiz = await Quiz.findOne(quizID)
    if(!quiz){
      throw new NotFoundException()
    }

    if(quiz.questionCount > 9){
      throw new BadRequestException({ errors:{ msg: "10 Questions limit."}})
    }

    const { errors, isValid } = questionValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }
    const { name, optionA, optionB, optionC, optionD, answer } = dto

    const exists = await Question.findOne({ name })
    if(exists){
      throw new BadRequestException({ errors:{ name: "Already exists this Question."}})
    }

    const question = new Question()
    question.name = name
    question.optionA = optionA
    question.optionB = optionB
    question.optionC = optionC
    question.optionD = optionD
    question.answer = answer
    question.quiz = quiz
    await question.save()

    quiz.questionCount = quiz.questionCount + 1
    await quiz.save()

    return question
  }

  async getQuestion(id: string,quizId: string): Promise<Question>{
    const question = await Question.findOne({ id, quiz:{ id: quizId }})
    if(!question){
      throw new NotFoundException()
    }
    return question
  }

  async quizPublishedController(id: string, published: boolean): Promise<Quiz>{
    if(typeof published === 'undefined'){
      throw new BadRequestException({ errors:{ published: 'Published required.'}})
    }else if(typeof published !== 'boolean'){
      throw new BadRequestException({ errors:{ published: 'Published type must be boolean.'}})
    }

    const quiz = await Quiz.findOne(id)
    if(!quiz){
      throw new NotFoundException()
    }

    if(published && quiz.questionCount < 5){
      throw new BadRequestException({ errors:{ published: "Min 5qs required"}})
    }else if(published && quiz.questionCount > 10){
      throw new BadRequestException({ errors:{ published: "Mix 10qs allowed"}})
    }

    quiz.published = published
    await quiz.save()
    return quiz
  }

  async updateQuestion(id: string, quizId: string, dto: CreateQuestionDto): Promise<Question>{
    const question = await this.getQuestion(id,quizId)

    const { errors, isValid } = questionValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }

    const { name, optionA, optionB, optionC, optionD, answer } = dto
    question.name = name
    question.optionA = optionA
    question.optionB = optionB
    question.optionC = optionC
    question.optionD = optionD
    question.answer = answer
    await question.save()
    return question
  }

  async deleteQuestion(id: string, quizId: string): Promise<boolean>{
    const questionDeleted = await Question.delete({ id, quiz:{ id: quizId }})
    if(questionDeleted.affected === 0){
      throw new NotFoundException()
    }else if(questionDeleted.affected === 1){
      const quiz = await Quiz.findOne(quizId)
      quiz.questionCount = quiz.questionCount - 1
      await quiz.save()
      return true
    }
    return false
  }

  async getQuizs(): Promise<Quiz[]>{
    const quizs = await Quiz.find()
    return quizs
  }

  async getQuestionsById(id: string): Promise<Question[]>{
    const questions = await Question.find({ quiz:{ id }})
    return questions
  }

  async getQuiz(id: string): Promise<Quiz>{
    const quiz = await Quiz.findOne(id)
    if(!quiz){
      throw new NotFoundException()
    }
    const questions = await this.getQuestionsById(quiz.id)
    quiz.questions = questions
    return quiz
  }

  async getUpdateQuiz(id: string, dto: CreateQuizDto): Promise<Quiz>{
    const { errors, isValid } = quizValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }
    const { title, duration } = dto
    const quiz = await Quiz.findOne(id)
    quiz.title = title
    quiz.duration = duration
    await quiz.save()
    return quiz
  }

  async getDeleteQuiz(id: string): Promise<boolean>{
    const quiz = await Quiz.delete(id)
    if(quiz.affected === 0){
      throw new NotFoundException()
    }
    return true
  }


}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Submission, SubmissionStatus } from './submission.entity';
import { User } from 'src/user/user.entity';
import { Quiz } from 'src/quiz/quiz.entity';
import { CreateSubmissionAnswerDto } from './dto/create-submission-answer.dto';
import { SubmissionAnswer } from './submission-answer.entity';
import { Question, Answer } from 'src/quiz/question.entity';

@Injectable()
export class SubmissionService {


  async createSubmission(
    quizId: string,
    user: User
  ): Promise<Submission>{
    const quiz = await Quiz.findOne({ id: quizId, published: true })
    if(!quiz){
      throw new NotFoundException({ errors: { quiz: 'Quiz not found.' }})
    }

    const exists = await Submission.findOne({ quiz:{ id: quizId }, user:{ id: user.id } })
    if(exists){
      throw new BadRequestException({ errors:{ msg: "Already taken."}})
    }

    const submission = new Submission()
    submission.user = user
    submission.quiz = quiz
    submission.status = SubmissionStatus.Open
    await submission.save()
    return submission
  }

  async createSubmissionAnswer(
    submissionId: string,
    questionId: string,
    user: User,
    dto: CreateSubmissionAnswerDto
  ): Promise<SubmissionAnswer>{
    const submission = await Submission.findOne({ id: submissionId, user:{ id: user.id } })
    if(!submission){
      throw new NotFoundException()
    }

    if(submission.status === SubmissionStatus.Closed){
      throw new BadRequestException({ errors: { msg: "Quiz closed."}})
    }

    // Check it out Submission whether time over or not
    const createdAt = new Date(submission.createdAt).getTime()
    const duration = submission.quiz.duration * 60 * 1000
    const deadline = createdAt + duration
    const now = new Date().getTime()
    if(deadline < now){
      submission.status = SubmissionStatus.Closed
      await submission.save()
      throw new BadRequestException({ errors:{ msg: "Quiz closed."}})
    }

    const { answer } = dto

    if(!answer){
      throw new BadRequestException({ errors:{ answer: "Answer required."}})
    }else if(!(answer in Answer)){
      throw new BadRequestException({ errors:{ answer: "Invalid answer type."}})
    }

    const question = await Question.findOne(questionId)
    if(!question){
      throw new NotFoundException({ errors:{ question: 'Question not found. '}})
    }

    const submissionAnswer = new SubmissionAnswer()
    submissionAnswer.submission = submission
    submissionAnswer.question = question
    submissionAnswer.answer = answer
    await submissionAnswer.save()

    if(question.answer === answer){
      submission.result += 1
      await submission.save()
    }


    return submissionAnswer
  }


  async getSubmissions(): Promise<Submission[]>{
    let items = await Submission.find()
    return items
  }

  async getSubmissionsByUserId(userId: string): Promise<Submission[]>{
    let items = await Submission.find({ user:{ id: userId }})
    return items
  }

  async getUsersSubmissions(user: User): Promise<Submission[]>{
    const items = await Submission.find({ user:{ id: user.id }})
    return items
  }

  async getSubmissionById(id: string): Promise<Submission>{
    const item = await Submission.findOne(id)
    if(!item){
      throw new NotFoundException()
    }

    const questions = await Question.find({ quiz:{ id: item.quiz.id }})
    item.quiz['questions'] = questions

    const answers = await SubmissionAnswer.find({ submission:{ id }})
    item.answers = answers
    return item
  }

  async getSubmissionByIdForUser(id: string, user: User): Promise<Submission>{
    const item = await Submission.findOne({ id, user:{ id: user.id }})
    if(!item){
      throw new NotFoundException()
    }

    const questions = await Question.find({ quiz:{ id: item.quiz.id }})
    item.quiz['questions'] = questions

    const answers = await SubmissionAnswer.find({ submission:{ id }})
    item.answers = answers
    return item
  }



}

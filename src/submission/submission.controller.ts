import { Controller, Body, Post, Get, Param, ParseUUIDPipe, Put, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Submission } from './submission.entity';
import { CreateSubmissionAnswerDto } from './dto/create-submission-answer.dto';
import { SubmissionAnswer } from './submission-answer.entity';
import { Quiz } from 'src/quiz/quiz.entity';

@Controller('submission')
export class SubmissionController {
  constructor(private submissionService: SubmissionService){}

  @Get('/take')
  @UseGuards(AuthGuard('user'))
  async takeQuiz(@GetUser() user: User){
    const submission = await Quiz.findOne({ published: true })
    if(!submission){
      throw new NotFoundException()
    }
    return submission
  }

  @Post('/:quizId/create')
  @UseGuards(AuthGuard('user'))
  createSubmission(
    @Param('quizId',ParseUUIDPipe) quizId: string,
    @GetUser() user: User
  ): Promise<Submission>{
    return this.submissionService.createSubmission(quizId,user)
  }

  @Post('/:submissionId/:questionId/answer')
  @UseGuards(AuthGuard('user'))
  createSubmissionAnswer(
    @Param('submissionId',ParseUUIDPipe) subId: string,
    @Param('questionId',ParseUUIDPipe) qusId: string,
    @GetUser() user: User,
    @Body() dto: CreateSubmissionAnswerDto
  ):Promise<SubmissionAnswer>{
    return this.submissionService.createSubmissionAnswer(subId,qusId,user,dto)
  }

  @Get('/')
  @UseGuards(AuthGuard('admin'))
  getSubmissions(): Promise<Submission[]>{
    return this.submissionService.getSubmissions()
  }

  @Get('/user')
  @UseGuards(AuthGuard('user'))
  getUsersSubmissions(
    @GetUser() user: User
  ): Promise<Submission[]>{
    return this.submissionService.getSubmissions()
  }

  @Get('/:id')
  @UseGuards(AuthGuard('user'))
  getSubmission(
    @Param('id',ParseUUIDPipe) id: string,
    @GetUser() user: User
  ): Promise<Submission>{
    return this.submissionService.getSubmissionById(id)
  }

}

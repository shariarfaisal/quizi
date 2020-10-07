import { Controller, Body, Post, Get, Param, ParseUUIDPipe, Put, Delete, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Submission } from './submission.entity';
import { CreateSubmissionAnswerDto } from './dto/create-submission-answer.dto';
import { SubmissionAnswer } from './submission-answer.entity';

@Controller('submission')
export class SubmissionController {
  constructor(private submissionService: SubmissionService){}

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

  @Get('/:userId/user')
  @UseGuards(AuthGuard('admin'))
  getSubmissionsByUserId(@Param('userId',ParseUUIDPipe) userId: string): Promise<Submission[]>{
    return this.submissionService.getSubmissionsByUserId(userId)
  }

  @Get('/user')
  @UseGuards(AuthGuard('user'))
  getUsersSubmissions(
    @GetUser() user: User
  ): Promise<Submission[]>{
    return this.submissionService.getUsersSubmissions(user)
  }

  @Get('/:id')
  @UseGuards(AuthGuard('admin'))
  getSubmission(
    @Param('id',ParseUUIDPipe) id: string
  ): Promise<Submission>{
    return this.submissionService.getSubmissionById(id)
  }

  @Get('/:id/foruser')
  @UseGuards(AuthGuard('user'))
  getSubmissionForUser(
    @Param('id',ParseUUIDPipe) id: string,
    @GetUser() user: User
  ): Promise<Submission>{
    return this.submissionService.getSubmissionByIdForUser(id,user)
  }

}

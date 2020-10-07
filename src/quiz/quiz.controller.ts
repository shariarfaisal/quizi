import { Controller, Body, Get, Param, Post, ParseUUIDPipe, UseGuards, Put, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './quiz.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AuthGuard } from '@nestjs/passport';
import { Question } from './question.entity';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/user/get-user.decorator';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService){}

  @Post('/create')
  @UseGuards(AuthGuard('admin'))
  createQuiz(@Body() dto: CreateQuizDto): Promise<Quiz>{
    return this.quizService.createQuiz(dto)
  }

  @Get('/')
  @UseGuards(AuthGuard('admin'))
  getQuizs(): Promise<Quiz[]>{
    return this.quizService.getQuizs()
  }

  @Get('/user')
  @UseGuards(AuthGuard('user'))
  getQuizesForUser(@GetUser() user: User): Promise<Quiz[]>{
    // TODO: Make changes for user ....
    return this.quizService.userHomepageQuizs(user)
  }

  @Get('/:id')
  getQuiz(@Param('id', ParseUUIDPipe) id: string): Promise<Quiz>{
    return this.quizService.getQuiz(id)
  }

  @Put('/:quizId/published')
  @UseGuards(AuthGuard('admin'))
  quizPublishedController(
    @Param('quizId', ParseUUIDPipe) quizId: string,
    @Body('published') published: boolean
  ): Promise<Quiz>{
    return this.quizService.quizPublishedController(quizId,published)
  }

  @Put('/:quizId/update')
  @UseGuards(AuthGuard('admin'))
  updateQuiz(
    @Param('quizId', ParseUUIDPipe) quizId: string,
    @Body() dto: CreateQuizDto
  ): Promise<Quiz>{
    return this.quizService.getUpdateQuiz(quizId,dto)
  }

  @Delete('/:quizId/delete')
  @UseGuards(AuthGuard('admin'))
  deleteQuiz(
    @Param('quizId', ParseUUIDPipe) quizId: string
  ): Promise<boolean>{
    return this.quizService.getDeleteQuiz(quizId)
  }

  @Post('/:quizID/question')
  @UseGuards(AuthGuard('admin'))
  createQuestion(@Param('quizID', ParseUUIDPipe) quizID: string, @Body() dto: CreateQuestionDto): Promise<Question>{
    return this.quizService.createQuestion(quizID,dto)
  }


  @Get('/:quizId/:questionsId')
  @UseGuards(AuthGuard('admin'))
  getQuestion(
    @Param('quizId', ParseUUIDPipe) quizId: string,
    @Param('questionId', ParseUUIDPipe) questionId: string
  ): Promise<Question>{
    return this.quizService.getQuestion(quizId,questionId)
  }

  @Put('/:quizId/:questionId/update')
  @UseGuards(AuthGuard('admin'))
  updateQuestion(
    @Param('quizId', ParseUUIDPipe) quizId: string,
    @Param('questionId', ParseUUIDPipe) questionId: string,
    @Body() dto: CreateQuestionDto
  ): Promise<Question>{
    return this.quizService.updateQuestion(questionId,quizId,dto)
  }

  @Delete('/:quizId/:questionId/delete')
  @UseGuards(AuthGuard('admin'))
  deleteQuestion(
    @Param('quizId', ParseUUIDPipe) quizId: string,
    @Param('questionId', ParseUUIDPipe) questionId: string
  ): Promise<boolean>{
    return this.quizService.deleteQuestion(questionId,quizId)
  }

}

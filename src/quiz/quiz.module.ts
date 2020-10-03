import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt'}),
  ],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}

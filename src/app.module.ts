import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';
import { SubmissionModule } from './submission/submission.module';
import { typeOrmConfig } from './config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminModule,
    QuizModule,
    UserModule,
    SubmissionModule
  ]
})
export class AppModule {}

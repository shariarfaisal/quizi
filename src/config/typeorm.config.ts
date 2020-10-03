import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'
import {Admin} from '../admin/admin.entity'
import {User} from '../user/user.entity'
import {Submission} from '../submission/submission.entity'
import {SubmissionAnswer} from '../submission/submission-answer.entity'
import { Quiz } from 'src/quiz/quiz.entity'
import { Question } from 'src/quiz/question.entity'

const dbConfig = config.get('db')

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.PG_HOSTNAME || dbConfig.host,
  port: 5432,
  username:  process.env.PG_USERNAME ||  dbConfig.username,
  database: process.env.PG_DATABASE ||  dbConfig.database,
  password: process.env.PG_PASSWORD ||  dbConfig.password,
  entities: [ Admin, User, Quiz, Question, Submission, SubmissionAnswer ],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
}

import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from "typeorm";
import { User } from '../user/user.entity'
import { Quiz } from "src/quiz/quiz.entity";
import { SubmissionAnswer } from "./submission-answer.entity";

export enum SubmissionStatus{
  Open = 'Open',
  Closed = 'Closed'
}

@Entity()
export class Submission extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, user => user.submissions,{ eager: true })
  user: User

  @ManyToOne(type => Quiz, quiz => quiz.submissions,{ eager: true })
  quiz: Quiz

  @OneToMany(type => SubmissionAnswer, answer => answer.question,{ eager: false, onDelete: 'CASCADE' })
  answers: SubmissionAnswer[]

  @Column()
  status: SubmissionStatus

  @Column({ nullable: true, default: 0 })
  result: number

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
}

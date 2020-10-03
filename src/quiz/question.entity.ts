import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from "typeorm";
import { Quiz } from "./quiz.entity";
import { SubmissionAnswer } from "src/submission/submission-answer.entity";

export enum Answer{
  optionA = 'optionA',
  optionB = 'optionB',
  optionC = 'optionC',
  optionD = 'optionD'
}

@Entity()
export class Question extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Quiz, quiz => quiz.questions, { eager: true })
  quiz: Quiz

  @Column()
  name: string;

  @Column()
  optionA: string;

  @Column()
  optionB: string;

  @Column()
  optionC: string;

  @Column()
  optionD: string;

  @Column({ type: 'enum', enum: Answer})
  answer: Answer

  @OneToMany(type => SubmissionAnswer, answer => answer.question, { eager: false })
  answers: SubmissionAnswer[]
}

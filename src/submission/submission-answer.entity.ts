import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Submission } from "./submission.entity";
import { Question, Answer } from "src/quiz/question.entity";


@Entity()
export class SubmissionAnswer extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Submission, submission => submission.answers,{ eager: true })
  submission: Submission

  @ManyToOne(type => Question, question => question.answers, { eager: true })
  question: Question

  @Column()
  answer: Answer
}

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Question } from "./question.entity";
import { Submission } from "src/submission/submission.entity";

@Entity()
export class Quiz extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @OneToMany(type => Question, question => question.quiz, { eager: false, onDelete: 'CASCADE' })
  questions: Question[]

  @Column()
  questionCount: number;

  @Column()
  duration: number;

  @Column({ default: false })
  published: boolean;

  @OneToMany(type => Submission, submission => submission.quiz,{ eager: false, onDelete: 'CASCADE' })
  submissions: Submission[]

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
}

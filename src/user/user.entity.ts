import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Submission } from 'src/submission/submission.entity';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Submission, submission => submission.user,{ eager: false, onDelete: 'CASCADE'})
  submissions: Submission[]
}

import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class Admin extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  // @OneToMany(type => Quize, quize => quize.author,{ eager: false, onDelete: 'CASCADE'})
  // quize: Quize[]
}

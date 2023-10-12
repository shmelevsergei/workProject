import { Question } from 'src/questions/entities/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn({ name: 'answer_id' })
  id: number;

  @Column()
  variant_1: string;

  @Column()
  variant_2: string;

  @Column()
  variant_3: string;

  @Column()
  variant_4: string;

  @OneToOne(() => Question, (question) => question.id)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

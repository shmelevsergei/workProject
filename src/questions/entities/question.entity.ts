import { Answer } from 'src/answers/entities/answer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
@Entity()
export class Question {
  @PrimaryGeneratedColumn({ name: 'question_id' })
  id: number;

  @Column()
  question: string;

  @Column()
  variant_answer: number;

  @OneToOne(() => Answer, (answer) => answer.question, { onDelete: 'CASCADE' })
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

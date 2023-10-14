import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Question {
  @PrimaryGeneratedColumn({ name: 'question_id' })
  id: number;

  @Column()
  question: string;

  @Column()
  variant: number;

  @UpdateDateColumn()
  updatedAt: Date;
}

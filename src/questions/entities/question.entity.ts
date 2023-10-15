import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  variant: number;

  @Column()
  variant_1: string;

  @Column()
  variant_2: string;

  @Column()
  variant_3: string;

  @Column()
  variant_4: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createAt: Date;
}

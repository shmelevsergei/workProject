import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  question: string

  @Column()
  variant: string

  @Column()
  variant_1: string

  @Column()
  variant_2: string

  @Column()
  variant_3: string

  @Column()
  variant_4: string

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createAt: Date
}

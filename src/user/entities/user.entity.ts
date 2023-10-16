import { Person } from 'src/persons/entities/person.entity'
import { Rating } from 'src/rating/entities/rating.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Rating, (rating) => rating.user, { onDelete: 'CASCADE' })
  ratings: Rating[]

  @OneToOne(() => Person, (person) => person.user, { onDelete: 'CASCADE' })
  person: Person

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

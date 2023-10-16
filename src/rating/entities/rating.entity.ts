import { Person } from 'src/persons/entities/person.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Rating {
  @PrimaryGeneratedColumn({ name: 'rating_id' })
  id: number

  @Column({ nullable: true })
  value: number

  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Person, (person) => person.ratings)
  @JoinColumn({ name: 'person_id' })
  person: Person

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

import { Rating } from 'src/rating/entities/rating.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Person {
  @PrimaryGeneratedColumn({ name: 'person_id' })
  id: number

  @Column()
  station: string

  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  city: string

  @OneToOne(() => User, (user) => user.person)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => Rating, (rating) => rating.person)
  ratings: Rating[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

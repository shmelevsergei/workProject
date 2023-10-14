import { Person } from 'src/persons/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn({ name: 'rating_id' })
  id: number;

  @Column({ default: null })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Person, (person) => person.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  person: Person;
}

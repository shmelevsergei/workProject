import { IsNotEmpty, IsNumber } from 'class-validator'
import { Person } from 'src/persons/entities/person.entity'
import { User } from 'src/user/entities/user.entity'

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  value: number

  @IsNotEmpty()
  user: User

  @IsNotEmpty()
  person: Person
}

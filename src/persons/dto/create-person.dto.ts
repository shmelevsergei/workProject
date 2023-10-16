import { IsNotEmpty, IsOptional } from 'class-validator'
import { Rating } from 'src/rating/entities/rating.entity'
import { User } from 'src/user/entities/user.entity'

export class CreatePersonDto {
  @IsNotEmpty()
  station: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  surname: string

  @IsNotEmpty()
  phone: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  city: string

  @IsNotEmpty()
  user: User

  @IsOptional()
  rating?: Rating
}

import { IsEmail, IsOptional, MinLength } from 'class-validator'
import { Person } from '../../persons/entities/person.entity'

export class CreateUserDto {
  @IsEmail()
  email: string

  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string

  @IsOptional()
  person: Person
}

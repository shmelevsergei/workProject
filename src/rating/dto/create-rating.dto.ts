import { IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  user: User;
}

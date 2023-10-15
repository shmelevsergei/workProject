import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  variant: number;

  @IsNotEmpty()
  variant_1: string;

  @IsNotEmpty()
  variant_2: string;

  @IsNotEmpty()
  variant_3: string;

  @IsNotEmpty()
  variant_4: string;
}

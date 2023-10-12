import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  answer: number;
}

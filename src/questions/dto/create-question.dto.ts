import { IsNotEmpty } from 'class-validator';
import { Answer } from 'src/answers/entities/answer.entity';

export class CreateQuestionDto {
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  variant: number;

  @IsNotEmpty()
  answers: Answer;
}

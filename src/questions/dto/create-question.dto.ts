import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateQuestionDto {
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  question: string

  @IsNotEmpty()
  variant: string

  @IsNotEmpty()
  variant_1: string

  @IsNotEmpty()
  variant_2: string

  @IsNotEmpty()
  variant_3: string

  @IsNotEmpty()
  variant_4: string

  @IsNotEmpty()
  variant_5: string

  @IsNotEmpty()
  complexity: string

  @IsOptional()
  link?: string
}

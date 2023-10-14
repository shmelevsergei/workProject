import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answers/entities/answer.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    if (
      !createQuestionDto.question ||
      !createQuestionDto.variant ||
      !createQuestionDto.answers.variant_1 ||
      !createQuestionDto.answers.variant_2 ||
      !createQuestionDto.answers.variant_3 ||
      !createQuestionDto.answers.variant_4
    )
      throw new BadRequestException('Заполните, пожалуйста все поля');

    const newQuestion = await this.questionRepository.save({
      question: createQuestionDto.question,
      variant: createQuestionDto.variant,
    });

    const newAnswers = await this.answerRepository.save({
      variant_1: createQuestionDto.answers.variant_1,
      variant_2: createQuestionDto.answers.variant_2,
      variant_3: createQuestionDto.answers.variant_3,
      variant_4: createQuestionDto.answers.variant_4,
    });
    return { newQuestion, newAnswers };
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}

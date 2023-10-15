import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    if (
      !createQuestionDto.question ||
      !createQuestionDto.variant ||
      !createQuestionDto.variant_1 ||
      !createQuestionDto.variant_2 ||
      !createQuestionDto.variant_3 ||
      !createQuestionDto.variant_4
    )
      throw new BadRequestException('Заполните, пожалуйста, все поля');

    const newQuestion = await this.questionRepository.save({
      question: createQuestionDto.question,
      variant: createQuestionDto.variant,
      variant_1: createQuestionDto.variant_1,
      variant_2: createQuestionDto.variant_2,
      variant_3: createQuestionDto.variant_3,
      variant_4: createQuestionDto.variant_4,
    });

    return { newQuestion };
  }

  async findAll() {
    const questions = await this.questionRepository.find();
    return questions;
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
    });
    if (!question)
      throw new BadRequestException('Такого вопроса не существует');
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOne({
      where: { id },
    });

    if (!question)
      throw new BadRequestException('Такого вопроса не существует');

    return await this.questionRepository.update(id, updateQuestionDto);
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
    });

    if (!question)
      throw new BadRequestException('Такого вопроса не существует');

    return await this.questionRepository.delete(id);
  }
}

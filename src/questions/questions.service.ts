import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { Repository } from 'typeorm'
import { Question } from './entities/question.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    if (
      !createQuestionDto.question ||
      !createQuestionDto.variant_1 ||
      !createQuestionDto.variant_2 ||
      !createQuestionDto.variant_3 ||
      !createQuestionDto.variant_4 ||
      !createQuestionDto.variant_5 ||
      !createQuestionDto.complexity
    )
      throw new BadRequestException('Заполните, пожалуйста, все поля!')

    if (!createQuestionDto.variant || null)
      throw new BadRequestException('Не выбран ни один ответ!')

    const newQuestion = await this.questionRepository.save({
      question: createQuestionDto.question.toString(),
      variant: createQuestionDto.variant.toString(),
      variant_1: createQuestionDto.variant_1.toString(),
      variant_2: createQuestionDto.variant_2.toString(),
      variant_3: createQuestionDto.variant_3.toString(),
      variant_4: createQuestionDto.variant_4.toString(),
      variant_5: createQuestionDto.variant_5.toString(),
      link: createQuestionDto.link.toString(),
      complexity: createQuestionDto.complexity.toString(),
    })

    return { newQuestion }
  }

  async findAll() {
    const questions = await this.questionRepository.find()
    return questions
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
    })
    if (!question) throw new BadRequestException('Такого вопроса не существует')
    return question
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOne({
      where: { id },
    })

    if (!question) throw new BadRequestException('Такого вопроса не существует')

    return await this.questionRepository.update(id, updateQuestionDto)
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
    })

    if (!question) throw new BadRequestException('Такого вопроса не существует')

    return await this.questionRepository.delete(id)
  }

  async getQuestionsByComplexity(complexity: string, quantity: number) {
    const allAvailableQuestions = await this.questionRepository.find({
      where: { complexity },
    })

    const availableQuestionsCount = allAvailableQuestions.length

    if (availableQuestionsCount <= quantity) {
      // Возвращаем все доступные вопросы заданной сложности
      return allAvailableQuestions
    } else {
      // Формируем случайный список вопросов до достижения запрошенного количества
      const selectedQuestions: Question[] = []
      const usedIndexes: Set<number> = new Set()

      while (selectedQuestions.length < quantity) {
        const randomIndex = Math.floor(Math.random() * availableQuestionsCount)

        if (!usedIndexes.has(randomIndex)) {
          selectedQuestions.push(allAvailableQuestions[randomIndex])
          usedIndexes.add(randomIndex)
        }
      }

      return selectedQuestions
    }
  }

  async getQuestionsByComplexitiesQuantities(quantities: Map<string, number>) {
    const questionsByComplexity = new Map<string, Question[]>()

    for (const [complexity, quantity] of quantities) {
      const availableQuestions = await this.questionRepository.count({
        where: { complexity },
      })
      const selectedQuantity = Math.min(quantity, availableQuestions)

      const questions = await this.getQuestionsByComplexity(
        complexity,
        selectedQuantity,
      )
      questionsByComplexity.set(complexity, questions)
    }

    return questionsByComplexity
  }

  async generateQuestions() {
    const quantities = new Map<string, number>([
      ['easy', 10],
      ['normal', 10],
      ['hard', 10],
      ['superGame', 5],
    ])

    const questionsByComplexity = new Map<string, Question[]>()

    for (const [complexity, quantity] of quantities) {
      const questions = await this.getQuestionsByComplexity(
        complexity,
        quantity,
      )
      questionsByComplexity.set(complexity, questions)
    }

    return Object.fromEntries(questionsByComplexity)
  }
}

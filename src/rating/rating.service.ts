import { Injectable, BadRequestException } from '@nestjs/common'
import { CreateRatingDto } from './dto/create-rating.dto'
import { UpdateRatingDto } from './dto/update-rating.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Rating } from './entities/rating.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}
  async create(createRatingDto: CreateRatingDto, id: number) {
    const rating = {
      value: createRatingDto.value,
      person: { id: +createRatingDto.person },
      user: { id },
    }

    if (!rating) throw new BadRequestException('Упс, что-то пошло не так!')
    return await this.ratingRepository.save(rating)
  }

  async findAll(id: number) {
    const ratings = await this.ratingRepository.find({
      where: {
        user: { id },
      },
      relations: {
        person: true,
      },
    })
    return ratings
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const ratings = await this.ratingRepository.find({
      where: {
        user: { id },
      },
      relations: {
        person: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    return ratings
  }
}

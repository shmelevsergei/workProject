import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { RatingService } from './rating.service'
import { CreateRatingDto } from './dto/create-rating.dto'

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRatingDto: CreateRatingDto, @Req() req) {
    return this.ratingService.create(createRatingDto, +req.user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.ratingService.findAll(+req.user.id)
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.ratingService.findAllWithPagination(+req.user.id, +page, +limit)
  }
}

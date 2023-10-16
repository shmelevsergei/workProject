import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common'
import { PersonsService } from './persons.service'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPersonDto: CreatePersonDto, @Req() req) {
    return this.personsService.create(
      createPersonDto,
      req.user.email,
      req.user.id,
    )
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.personsService.findAllWithPagination(
      +req.user.id,
      +page,
      +limit,
    )
  }

  @Get()
  findAll() {
    return this.personsService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id)
  }
}

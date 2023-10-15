import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}
  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  async findAll() {
    const persons = await this.personRepository.find({
      relations: {
        ratings: true,
      },
    });
    if (!persons) throw new BadRequestException('Нет ни одного пользователя!');
    return persons;
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: {
        ratings: true,
      },
    });
    if (!person) throw new BadRequestException('Поьзователь не найден');
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personRepository.findOne({
      where: { id },
    });

    if (!person) throw new BadRequestException('Пользователь не найден!');

    return await this.personRepository.update(id, updatePersonDto);
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';

interface options {
  studentsCount?: string;
  lessonsPerPage?: number;
  status?: boolean;
  page?: number;
  teacherIds?: string;
  date?: string
}



@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>) {
  }

  async create(dto: CreateLessonDto) {
    const res = [];
    const needed = dto.days;
    let first = new Date(dto.firstDate).toLocaleDateString();
    let dayCounter = 365

    if (dto.lastDate) {
      // Если есть конечная дата
      const second = new Date(dto.lastDate).toLocaleDateString();
      while (first < second) {
        const date = new Date(
          Date.UTC(Number(first.split(".")[2]), Number(first.split(".")[1]) - 1, Number(first.split(".")[0]))
        );

        if (needed.indexOf(date.getDay()) != -1) {
          const lesson = this.lessonRepository.create(dto)
          lesson.teachers = dto.teacherIds.map(id => ({ ... new Teacher(), id }))
          lesson.date = date
          lesson.status = false
          const result = await this.lessonRepository.save(lesson)
          res.push(result.id);
          // Создавать не больше 300 занятий
          if (res.length == 300 || dayCounter == 0) {
            // Вернуть ошибку 400
            throw new HttpException(`${res.length == 300 ? "Количество уроков не может быть больше 300" : "Ограничение по дате: 1 год"}`, HttpStatus.BAD_REQUEST);
          }
        }
        date.setDate(date.getDate() + 1);
        first = date.toLocaleDateString();
        dayCounter--;
      }
    } else if (dto.lessonsCount) {
      // Если есть счетчик занятий
      while (res.length < dto.lessonsCount) {
        const date = new Date(
          Date.UTC(Number(first.split(".")[2]), Number(first.split(".")[1]) - 1, Number(first.split(".")[0]))
        );

        if (needed.indexOf(date.getDay()) != -1) {
          const lesson = this.lessonRepository.create(dto)
          lesson.teachers = dto.teacherIds.map(id => ({ ... new Teacher(), id }))
          lesson.date = date
          lesson.status = false
          const result = await this.lessonRepository.save(lesson)
          // Счетчик занятий
          res.push(result.id);
          // Создавать не больше 300 занятий
          if (res.length == 300 || dayCounter == 0) {
            // Вернуть ошибку 400
            throw new HttpException(`${res.length == 300 ? "Количество уроков не может быть больше 300" : "Ограничение по дате: 1 год"}`, HttpStatus.BAD_REQUEST);
          }
        }
        date.setDate(date.getDate() + 1);
        first = date.toLocaleDateString();
        dayCounter--;
      }
    }

    return res;
  }


  async findAll(query: options) {


    if (query.lessonsPerPage <= 0) {
      throw new HttpException("Некорректное значение", HttpStatus.BAD_REQUEST)
    }

    try {
      const lessons = await this.lessonRepository.find({
        where: {
          status: query.status,
        },
        take: query.lessonsPerPage || 5,
        skip: (query.page - 1) * (query.lessonsPerPage || 5) || 0,
        relations: {
          teachers: true,
          students: true
        }
      });

      return lessons;
    } catch (error) {
      throw error
    }
  }
}

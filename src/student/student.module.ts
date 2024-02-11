import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Student])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule { }

import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller()
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @Post("lessons")
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.lessonService.findAll(req.query);
  }

}

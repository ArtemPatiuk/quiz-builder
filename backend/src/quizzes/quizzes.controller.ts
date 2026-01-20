import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) { }

  @Post()
  createQuizz(@Body() dto: CreateQuizDto) {
    return this.quizzesService.create(dto);
  }

  @Get(':id')
  findOneQuizz(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizzesService.findOne(id);
  }

  @Get()
  getAllQuizzes() {
    return this.quizzesService.getAll();
  }
  @Delete(':id')
  deleteQuizz(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizzesService.delete(id);
  }
}

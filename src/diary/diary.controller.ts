/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateDiaryDTO } from './dto/create-diary.dto';
import { UpdatePatchDiaryDTO } from './dto/update-patch-diary.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { DiaryService } from './diary.service';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post('')
  async create(@Body() data: CreateDiaryDTO) {
    return this.diaryService.create(data);
  }

  @Get('student/:id')
  async listDiaryStudent(@ParamId() studentId) {
    return this.diaryService.listDiaryStudent(studentId);
  }

  @Get('today/:id')
  async list(@ParamId() studentId, @Query('date') dateString: string) {
    const date = new Date(dateString);
    return this.diaryService.listDiaryToday(studentId, date);
  }

  @Get(':id')
  async show(@ParamId() id) {
    return this.diaryService.show(id);
  }

  @Patch(':id')
  async upadatePartial(@Body() data: UpdatePatchDiaryDTO, @ParamId() id) {
    return this.diaryService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.diaryService.delete(id);
  }
}

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateClassroomDTO } from './dto/create-classroom.dto';
import { UpdatePutClassroomDTO } from './dto/update-put-classroom.dto';
import { UpdatePatchClassroomDTO } from './dto/update-patch-classroom.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { ClassroomService } from './classroom.service';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post(':id')
  async create(@ParamId() teacherId, @Body() name: CreateClassroomDTO) {
    return this.classroomService.create(teacherId, name);
  }

  @Get(':id')
  async list(@ParamId() teacherId) {
    return this.classroomService.list(teacherId);
  }

  @Get(':id')
  async show(@ParamId() id) {
    return this.classroomService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutClassroomDTO, @ParamId() id) {
    return this.classroomService.update(id, data);
  }

  @Patch(':id')
  async upadatePartial(@Body() data: UpdatePatchClassroomDTO, @ParamId() id) {
    return this.classroomService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.classroomService.delete(id);
  }
}

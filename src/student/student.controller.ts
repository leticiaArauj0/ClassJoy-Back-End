/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdatePutStudentDTO } from './dto/update-put-student.dto';
import { UpdatePatchStudentDTO } from './dto/update-patch-student.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('')
  async create(@Body() data: CreateStudentDTO) {
    return this.studentService.create(data);
  }

  @Get('teacher/:id')
  async listStudentsTeacher(@ParamId() classroomId) {
    return this.studentService.listStudentsTeacher(classroomId);
  }

  @Get('parents/:id')
  async listStudentsParents(@ParamId() parentsId) {
    return this.studentService.listStudentsParents(parentsId);
  }

  @Get('classroom/:id')
  async listStudentsClassroom(@ParamId() classroomId) {
    return this.studentService.listStudentsClassroom(classroomId);
  }

  @Get()
  async list() {
    return this.studentService.list();
  }

  @Get(':id')
  async show(@ParamId() id) {
    return this.studentService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutStudentDTO, @ParamId() id) {
    return this.studentService.update(id, data);
  }

  @Patch(':id')
  async upadatePartial(@Body() data: UpdatePatchStudentDTO, @ParamId() id) {
    return this.studentService.updatePartial(id, data);
  }

  @Patch('/connect/:id')
  async connectParent(@Body() data: UpdatePatchStudentDTO, @ParamId() id) {
    return this.studentService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.studentService.delete(id);
  }
}

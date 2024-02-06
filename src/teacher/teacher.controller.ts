import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdatePutUserDTO } from '../dto/update-put-user.dto';
import { UpdatePatchUserDTO } from '../dto/update-patch-user.dto';
import { TeacherService } from './teacher.service';
import { ParamId } from 'src/decorators/param-id-decorator';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.teacherService.create(data);
  }

  @Get()
  async list() {
    return this.teacherService.list();
  }

  @Get(':id')
  async show(@ParamId() id) {
    return this.teacherService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id) {
    return this.teacherService.update(id, data);
  }

  @Patch(':id')
  async upadatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id) {
    return this.teacherService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.teacherService.delete(id);
  }
}

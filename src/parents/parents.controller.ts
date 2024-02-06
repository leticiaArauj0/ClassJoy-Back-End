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
import { ParentsService } from './parents.service';
import { ParamId } from 'src/decorators/param-id-decorator';

@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.parentsService.create(data);
  }

  @Get()
  async list() {
    return this.parentsService.list();
  }

  @Get(':id')
  async show(@ParamId() id) {
    return this.parentsService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id) {
    return this.parentsService.update(id, data);
  }

  @Patch(':id')
  async upadatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id) {
    return this.parentsService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.parentsService.delete(id);
  }
}

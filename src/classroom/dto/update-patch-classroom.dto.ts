/* eslint-disable prettier/prettier */
import { CreateClassroomDTO } from './create-classroom.dto';
import { PartialType } from '@nestjs/mapped-types'

export class UpdatePatchClassroomDTO extends PartialType(CreateClassroomDTO) {}

/* eslint-disable prettier/prettier */
import { CreateDiaryDTO } from './create-diary.dto';
import { PartialType } from '@nestjs/mapped-types'

export class UpdatePatchDiaryDTO extends PartialType(CreateDiaryDTO) {}

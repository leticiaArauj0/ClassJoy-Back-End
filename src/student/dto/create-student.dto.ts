/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class CreateStudentDTO {
  @IsString()
  name: string;
  age: string
  teacherId: string
  classroomId: string

  @IsOptional()
  parentsId: number
}

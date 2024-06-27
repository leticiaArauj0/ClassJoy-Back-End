/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsInt, IsString, IsStrongPassword, isInt } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateClassroomDTO {
  @IsString()
  name: string;
}

/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [PrismaModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}

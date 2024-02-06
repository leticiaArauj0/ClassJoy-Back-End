import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeacherService } from './teacher.service';

@Module({
  imports: [PrismaModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}

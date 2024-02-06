import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { ParentsModule } from './parents/parents.module';

@Module({
  imports: [TeacherModule, ParentsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

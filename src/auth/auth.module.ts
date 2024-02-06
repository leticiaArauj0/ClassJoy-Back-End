/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TeacherModule } from 'src/teacher/teacher.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { ParentsModule } from 'src/parents/parents.module';

@Module({
  imports: [JwtModule.register({
    secret: "a^W-l5Z2Ozi7hy2]/GQ87B!NRBLykQLC"
  }),
  TeacherModule,
  ParentsModule,
  PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

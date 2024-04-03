/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { FileModule } from 'src/files/file.module';

@Module({
  imports: [JwtModule.register({
    secret: "a^W-l5Z2Ozi7hy2]/GQ87B!NRBLykQLC",
  }),
  forwardRef(() => UserModule),
  PrismaModule,
  FileModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}

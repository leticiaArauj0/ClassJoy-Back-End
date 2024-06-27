/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ClassroomModule),
    forwardRef(() => StudentModule),
    forwardRef(() => DiaryModule),
    MailerModule.forRoot({
      transport:
        'smtps://sallie.marquardt84@ethereal.email:71FNacNCdyA18yyaWG@smtp.ethereal.email',
      defaults: {
        from: '"ClassJoy" <sallie.marquardt84@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

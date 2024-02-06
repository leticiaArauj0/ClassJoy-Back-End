/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly teacherService: TeacherService
        ) {}

    async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const {authorization} = request.headers

    try {
        const data = this.authService.checkToken((authorization ?? '').split(' ')[1])

        request.tokenPayload = data

        request.user = await this.teacherService.show(data.id)

        return true;
    } catch(e) {
        return false;
    }
  }
}

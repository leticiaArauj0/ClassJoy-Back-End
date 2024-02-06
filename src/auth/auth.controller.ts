/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from 'src/decorators/user-decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() {email, password}: AuthLoginDTO) {
    return this.authService.login(email, password)
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO){
    return this.authService.register(body);
  }

  @Post('login-parents')
  async loginParents(@Body() {email, password}: AuthLoginDTO) {
    return this.authService.loginParents(email, password)
  }

  @Post('register-parents')
  async registerParents(@Body() body: AuthRegisterDTO){
    return this.authService.registerParents(body);
  }

  @Post('forget') 
  async forget(@Body() {email}: AuthForgetDTO){
    return this.authService.forget(email)
  }

  @Post('reset')
  async reset(@Body() {password}: AuthResetDTO) {
    return this.authService.reset(password)
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User('email') user) {
    return {user}
  }
}

/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { parents, teachers } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register';
import { TeacherService } from 'src/teacher/teacher.service';
import { ParentsService } from 'src/parents/parents.service';

@Injectable()
export class AuthService {

  private issuer = 'login'
  private audience = 'teachers'

  constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService, private readonly teacherService: TeacherService, private readonly parentsService: ParentsService) {}

  createToken(teacher: teachers) {
    return {
      accessToken: this.jwtService.sign({
        id: teacher.id,
        first_name: teacher.first_name,
        email: teacher.email
      }, {
        subject: String(teacher.id),
        issuer: this.issuer,
        audience: this.audience
      })
    }
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password:string) {
    const teacher = await this.prisma.teachers.findFirst({
      where: {
        email,
        password
      }
    })

    if(!teacher) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return this.createToken(teacher);
  }

  async forget(email: string) {
    const teacher = await this.prisma.teachers.findFirst({
      where: {
        email
      }
    })

    if(!teacher) {
      throw new UnauthorizedException('Email incorretos');
    }

    // Enviar Email

    return true;
  }

  async reset(password: string) {
    // Se validar o token

    const id = 0;

    const teacher = await this.prisma.teachers.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(teacher);
  }

  async register(data: AuthRegisterDTO) {
    const teacher = await this.teacherService.create(data);

    return this.createToken(teacher);
  }

// Auth Parents

  createTokenParents(parents: parents) {
    return {
      accessToken: this.jwtService.sign({
        id: parents.id,
        first_name: parents.first_name,
        email: parents.email
      }, {
        subject: String(parents.id),
        issuer: this.issuer,
        audience: 'parents'
      })
    }
  }

  checkTokenParents(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: 'parents'
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidTokenParents(token: string) {
    try {
      this.checkTokenParents(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async loginParents(email: string, password:string) {
    const parents = await this.prisma.parents.findFirst({
      where: {
        email,
        password
      }
    })

    if(!parents) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return this.createToken(parents);
  }

  async registerParents(data: AuthRegisterDTO) {
    const parents = await this.parentsService.create(data);

    return this.createToken(parents);
  }
}

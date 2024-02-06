/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from '../dto/update-put-user.dto';
import { UpdatePatchUserDTO } from '../dto/update-patch-user.dto';

@Injectable()
export class TeacherService {

    constructor(private readonly prisma: PrismaService) {}

    async create({first_name, last_name, email, password}: CreateUserDTO) {
        
        return this.prisma.teachers.create({
            data: {
                first_name,
                last_name,
                email,
                password,
            },
        })
    }

    async list() {
        return this.prisma.teachers.findMany()
    }

    async show(id: number) {

        await this.exists(id)

        return this.prisma.teachers.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, {first_name, last_name, email, password}: UpdatePutUserDTO) {

        await this.exists(id)

        return this.prisma.teachers.update({
            data: {
                first_name,
                last_name,
                email,
                password,
            },

            where: {
                id
            }
        })
    }

    async updatePartial(id: number, {first_name, last_name, email}: UpdatePatchUserDTO) {

        await this.exists(id)

        const data: any = {}

        if(first_name) {
            data.first_name = first_name
        }

        if(last_name) {
            data.last_name = last_name
        }

        if(email) {
            data.email = email
        }

        return this.prisma.teachers.update({
            data,

            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id)

        return this.prisma.teachers.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if(!(await this.prisma.teachers.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe`)
        }
    }

    async findUserByEmail(email: string) {
        const user = await this.prisma.teachers.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new NotFoundException(`Email: ${email} Not Found`);
        }
            
        return user;
    }
}

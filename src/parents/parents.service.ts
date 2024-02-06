/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from '../dto/update-put-user.dto';
import { UpdatePatchUserDTO } from '../dto/update-patch-user.dto';

@Injectable()
export class ParentsService {

    constructor(private readonly prisma: PrismaService) {}

    async create({first_name, last_name, email, password}: CreateUserDTO) {
        
        return this.prisma.parents.create({
            data: {
                first_name,
                last_name,
                email,
                password,
            },
        })
    }

    async list() {
        return this.prisma.parents.findMany()
    }

    async show(id: number) {

        await this.exists(id)

        return this.prisma.parents.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, {first_name, last_name, email, password}: UpdatePutUserDTO) {

        await this.exists(id)

        return this.prisma.parents.update({
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

        return this.prisma.parents.update({
            data,

            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id)

        return this.prisma.parents.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if(!(await this.prisma.parents.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe`)
        }
    }

    async findUserByEmail(email: string) {
        const user = await this.prisma.parents.findFirst({
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

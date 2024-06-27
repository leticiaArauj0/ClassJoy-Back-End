/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassroomDTO } from './dto/create-classroom.dto';
import { UpdatePutClassroomDTO } from './dto/update-put-classroom.dto';
import { UpdatePatchClassroomDTO } from './dto/update-patch-classroom.dto';

@Injectable()
export class ClassroomService {

    constructor(private readonly prisma: PrismaService) {}

    async create(teacherId: number, {name}: CreateClassroomDTO) {

        const teacher = await this.prisma.user.findUnique({
            where: { id: teacherId }
        });

        if (!teacher) {
            throw new NotFoundException('Teacher not found');
        }

        return this.prisma.classroom.create({
            data: {
                name: name,
                teacher: { connect: { id: teacherId } }
            }
        })
    }

    async list(id: number) {
        return this.prisma.classroom.findMany({
            where: {
                teacherId: id
            }
        })
    }

    async show(id: number) {

        await this.exists(id)

        return this.prisma.classroom.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, {name}: UpdatePutClassroomDTO) {

        await this.exists(id)

        return this.prisma.classroom.update({
            data: {
                name
            },

            where: {
                id
            }
        })
    }

    async updatePartial(id: number, {name}: UpdatePatchClassroomDTO) {

        await this.exists(id)

        const data: any = {}

        if(name) {
            data.name = name
        }

        return this.prisma.classroom.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id)

        return this.prisma.classroom.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if(!(await this.prisma.classroom.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`A turma ${id} não existe`)
        }
    }
}

/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdatePutStudentDTO } from './dto/update-put-student.dto';
import { UpdatePatchStudentDTO } from './dto/update-patch-student.dto';

@Injectable()
export class StudentService {

    constructor(private readonly prisma: PrismaService) {}

    async create({ name, age, classroomId, teacherId }: CreateStudentDTO) {
        const classroomIdInt = parseInt(classroomId)
        const teacherIdInt = parseInt(teacherId)
        const ageInt = parseInt(age)

        const teacher = await this.prisma.user.findUnique({
            where: { id: teacherIdInt }
        });

        const classroom = await this.prisma.classroom.findUnique({
            where: { id: classroomIdInt }
        });

        if (!teacher) {
            throw new NotFoundException('Professor não encontrado');
        } else if (!classroom) {
            throw new NotFoundException('Turma não encontrada');
        }

        return this.prisma.student.create({
            data: {
                name,
                age: ageInt,
                teacher: { connect: { id: teacherIdInt }},
                classroom: { connect: {id: classroomIdInt}},
            }
        })
    }

    async listStudentsTeacher(teacherId: number) {
        
        return this.prisma.student.findMany({
            where: {
                teacherId
            }
        })
    }

    async listStudentsParents(parentsId: number) {
        
        return this.prisma.student.findMany({
            where: {
                parentsId
            }
        })
    }

    async listStudentsClassroom(classroomId: number) {

        return this.prisma.student.findMany({
            where: {
                classroomId
            }
        })
    }

    async list() {

        return this.prisma.student.findMany()
    }

    async show(id: number) {

        await this.exists(id)

        return this.prisma.student.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, { name, age }: UpdatePutStudentDTO) {
        const ageInt = parseInt(age)

        await this.exists(id)

        return this.prisma.student.update({
            data: {
                name,
                age: ageInt
            },

            where: {
                id
            }
        })
    }

    async updatePartial(id: number, { name, age, parentsId }: UpdatePatchStudentDTO) {
        const ageInt = parseInt(age)

        await this.exists(id)

        const data: any = {}

        if(name) {
            data.name = name
        }

        if(ageInt){
            data.age = ageInt
        }

        if(parentsId) {
            data.parentsId = parentsId
        }

        return this.prisma.student.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id)

        return this.prisma.student.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if(!(await this.prisma.student.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O aluno ${id} não existe`)
        }
    }
}

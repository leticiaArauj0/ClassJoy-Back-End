/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ParseBoolPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiaryDTO } from './dto/create-diary.dto';
import { UpdatePatchDiaryDTO } from './dto/update-patch-diary.dto';

@Injectable()
export class DiaryService {

    constructor(private readonly prisma: PrismaService) {}

    async create({ 
        studentId, 
        date, 
        entryTime, 
        departureTime,
        feeding,
        ateAlone,
        obsFeeding,
        bathroom,
        bathroomAmount,
        obsBathroom,
        sleep,
        startSleep,
        endSleep,
        obsSleep,
        reminder,
        notice,  
    }: CreateDiaryDTO) {

        const studentIdInt = parseInt(studentId)
        const bathroomAmountInt = parseInt(bathroomAmount)

        const student = await this.prisma.student.findUnique({
            where: { id: studentIdInt }
        })

        if (!student) {
            throw new NotFoundException('Aluno não encontrado');
        }

        return this.prisma.diary.create({
            data: {
                entryTime,
                departureTime,
                date: new Date(date) || new Date,
                feeding: feeding || 'comeu',
                ateAlone: ateAlone,
                obsFeeding: obsFeeding || null,
                sleep: sleep,
                startSleep: startSleep || null,
                endSleep: endSleep || null,
                obsSleep: obsSleep || null,
                bathroom: bathroom,
                bathroomAmount: bathroomAmountInt !== undefined ? bathroomAmountInt : 0,
                obsBathroom: obsBathroom || null,
                reminder: reminder || null,
                notice: notice || null,
                student: studentIdInt ? { connect: { id: studentIdInt } } : undefined,
              }
        })
    }

    async listDiaryStudent(studentId: number) {
        
        return this.prisma.diary.findMany({
            where: {
                studentId: studentId
            }
        })
    }

    async listDiaryToday(studentId: number, date: Date) {
        return this.prisma.diary.findFirst({
            where: {
                studentId: studentId,
                date: {
                    equals: date
                }
            }
        })
    }

    async list() {
        return this.prisma.diary.findMany()
    }

    async show(id: number) {

        await this.exists(id)

        return this.prisma.diary.findUnique({
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, dto: UpdatePatchDiaryDTO) {
        await this.exists(id)
        const bathroomAmountInt = parseInt(dto.bathroomAmount)

        const data: any = {}

        if (dto.date) data.date = dto.date;
        if (dto.entryTime) data.entryTime = dto.entryTime;
        if (dto.departureTime) data.departureTime = dto.departureTime;
        if (dto.feeding) data.feeding = dto.feeding;
        if (dto.ateAlone !== undefined) data.ateAlone = dto.ateAlone;
        if (dto.obsFeeding) data.obsFeeding = dto.obsFeeding;
        if (dto.sleep !== undefined) data.sleep = dto.sleep;
        if (dto.startSleep) data.startSleep = dto.startSleep;
        if (dto.endSleep) data.endSleep = dto.endSleep;
        if (dto.obsSleep) data.obsSleep = dto.obsSleep;
        if (dto.bathroom !== undefined) data.bathroom = dto.bathroom;
        if (dto.bathroomAmount !== undefined) data.bathroomAmountInt = bathroomAmountInt; 
        if (dto.obsBathroom) data.obsBathroom = dto.obsBathroom;
        if (dto.reminder) data.reminder = dto.reminder;
        if (dto.notice) data.notice = dto.notice;   

        return this.prisma.diary.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id)

        return this.prisma.diary.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if(!(await this.prisma.diary.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`A agenda ${id} não existe`)
        }
    }
}

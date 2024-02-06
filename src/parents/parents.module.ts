import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ParentsService } from './parents.service';

@Module({
  imports: [PrismaModule],
  controllers: [ParentsController],
  providers: [ParentsService],
  exports: [ParentsService],
})
export class ParentsModule {}

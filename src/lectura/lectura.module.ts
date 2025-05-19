import { Module } from '@nestjs/common';
import { LecturaService } from './lectura.service';
import { LecturaController } from './lectura.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [LecturaController],
  providers: [LecturaService, PrismaService]
})
export class LecturaModule {}

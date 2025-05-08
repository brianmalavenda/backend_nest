import { Module } from '@nestjs/common';
import { DiarioLeidoService } from './diario-leido.service';
import { DiarioLeidoController } from './diario-leido.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [DiarioLeidoController],
  providers: [DiarioLeidoService, PrismaService]
})
export class DiarioLeidoModule {}

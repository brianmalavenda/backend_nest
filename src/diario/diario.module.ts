import { Module } from '@nestjs/common';
import { DiarioController } from './diario.controller';
import { DiarioService } from './diario.service';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [DiarioController],
  providers: [DiarioService, PrismaService]
})
export class DiarioModule {}

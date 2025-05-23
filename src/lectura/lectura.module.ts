import { Module } from '@nestjs/common';
import { LecturaService } from './lectura.service';
import { UsuarioService } from '../usuario/usuario.service';
import { LecturaController } from './lectura.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [LecturaController],
  providers: [LecturaService, PrismaService, UsuarioService]
})
export class LecturaModule {}

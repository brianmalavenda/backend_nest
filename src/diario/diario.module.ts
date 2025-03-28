import { Module } from '@nestjs/common';
import { DiarioController } from './diario.controller';
import { DiarioService } from './diario.service';

@Module({
  controllers: [DiarioController],
  providers: [DiarioService]
})
export class DiarioModule {}

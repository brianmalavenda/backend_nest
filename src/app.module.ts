import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DiarioModule } from './diario/diario.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PageModule } from './page/page.module';
import { LecturaModule } from './lectura/lectura.module';

@Module({
  imports: [AuthModule, DiarioModule, UsuarioModule, PageModule, LecturaModule]  
})
export class AppModule {}

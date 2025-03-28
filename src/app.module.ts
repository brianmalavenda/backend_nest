import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DiarioModule } from './diario/diario.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [AuthModule, DiarioModule, UsuarioModule, PageModule]  
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('usuario');
  }
}

import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerMiddleware } from './auth/logger/logger.middleware';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser'; // Importa cookie-parser

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();  
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true, // si estás usando cookies
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Documentacion de las API')
    .setDescription('Aplicacion de lectura de diarios')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  // defino el uso de los módulos de usuario y diario del middleware de validacion de login
  app.use('/usuario', new LoggerMiddleware().use);
  app.use('/diario', new LoggerMiddleware().use);
  app.use('/lectura', new LoggerMiddleware().use);
    
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

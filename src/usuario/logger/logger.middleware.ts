import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    const autorization = req.headers['authorization'];
    if(!autorization){
      throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
    }

    if(autorization !== "abc123"){
      throw new HttpException('Token invalido', HttpStatus.FORBIDDEN);
    }

    console.log("Esto es un log para cuando se consulta el path 'usuario'", req.url);
    next();
  }
}

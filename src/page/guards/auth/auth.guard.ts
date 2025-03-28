import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const authHeader = request.header('Authorization');
    // const headerValidate = request.headers['autorization'];
    
    if(request.url === '/greet' && request.method === 'GET'){
      throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
    }
    
    if(!authHeader){
      console.log('No autorizado');
      return false;
    }

    return true;
  }
}

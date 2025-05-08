import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException('No autorizado /greet', HttpStatus.UNAUTHORIZED);
    }
    
    if(!authHeader){
      console.log('No esta autorizado');
      return false;
    }

    return true;
  }
}

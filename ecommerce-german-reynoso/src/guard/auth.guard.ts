import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization']
    if (!authHeader){
      throw new HttpException('Not authoriced', HttpStatus.UNAUTHORIZED)
    }
    const authFormat = authHeader.split(' ');
    console.log (authHeader);
    console.log(authFormat);
    
    const credentialsBase64 = authFormat[1];
    const decodeCredentials = Buffer.from(
      credentialsBase64,
      'base64'
    ).toString(
      'utf-8'
    );
     console.log(decodeCredentials);
     const [username, password] = decodeCredentials.split(':');
     console.log(username, password)

    return true;


  }
}

import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { transcode } from 'buffer';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException('Token not found')
    }
    const authHeader = request.headers['authorization']
    if (!authHeader){
      throw new HttpException('Not authoriced', HttpStatus.UNAUTHORIZED)
    }
    try{
      const payload= await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET')
      });
      console.log('Payload', payload);
      request['user'] = payload;
    }catch{
      throw new UnauthorizedException('Invalid token')
    }    
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined{
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined
  }
}

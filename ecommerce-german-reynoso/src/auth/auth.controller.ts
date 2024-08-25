import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignAuthDto } from './dto/signinup-auth.dto';
import { request } from 'http';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  singIn(@Body() credentials: SignAuthDto){
    return this.authService.signIn(credentials)
  }
  @Post('singup')
  singUp (@Body()singUpuser: SignAuthDto, @Req()request){
    return this.authService, singUp(user);
  }
}
  
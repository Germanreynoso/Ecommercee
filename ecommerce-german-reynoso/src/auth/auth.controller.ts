import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { Request } from 'express';
import { userResponseDTO } from 'src/users/dto/response-user.dto';
import { requiresAuth } from 'express-openid-connect';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async singIn(@Body() credentials: SignInAuthDto){
    return this.authService.signIn(credentials)
  }
  @Post('signup')
  async singUp (@Body()singUpuser: SignUpAuthDto, @Req()request){
    const user = await this.authService.signUp(singUpuser)
    return new userResponseDTO(user);
  }
  @Get('auth0/protected')
  getAuth0Protected(@Req() request, requiresAuth){
    console.log(JSON.stringify(request.oidc));
    console.log(JSON.stringify(request.oidc.idToken));
    return JSON.stringify(request.oidc.user)
  }
}
  
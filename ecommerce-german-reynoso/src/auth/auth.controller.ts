import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { Request } from 'express';
import { userResponseDTO } from '../users/dto/response-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({ type: SignInAuthDto })
  @ApiResponse({ status: 200, description: 'User successfully signed in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async signIn(@Body() credentials: SignInAuthDto) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: SignUpAuthDto })
  @ApiResponse({ status: 201, description: 'User successfully signed up.', type: userResponseDTO })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async signUp(@Body() signUpUser: SignUpAuthDto, @Req() request: Request) {
    const user = await this.authService.signUp(signUpUser);
    return new userResponseDTO(user);
  }

  @Get('auth0/protected')
  @ApiOperation({ summary: 'Get Auth0 protected user information' })
  @ApiResponse({ status: 200, description: 'Protected user information retrieved.' })
  getAuth0Protected(@Req() request: Request) {
    console.log(JSON.stringify(request.oidc));
    console.log(JSON.stringify(request.oidc.idToken));
    return JSON.stringify(request.oidc.user);
  }
}

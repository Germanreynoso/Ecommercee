import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { userResponseDTO } from 'src/users/dto/response-user.dto';
import { UsersService } from 'src/users/users.service';
import { SignInAuthDto } from './dto/signin.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService){}
  async signIn(credentials: SignInAuthDto) {
    const user = await this.userService.findOneByEmail(credentials.email);
    if (user && user.password === credentials.password) {
      return "You are Logged in!";
    }
    return 'Email or password incorrect. Please try again';
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

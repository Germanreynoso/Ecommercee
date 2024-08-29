import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInUser: SignInAuthDto) {
    const user = await this.userService.findByEmail(signInUser.email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordMatching = await compare(signInUser.password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', 400);
    }

    const token = await this.createToken(user);
    return { token };
  }

  async signUp(signUpUser: SignUpAuthDto) {
    if (signUpUser.password !== signUpUser.passwordConfirm) {
      throw new HttpException('Passwords do not match', 400);
    }

    signUpUser.password = await hash(signUpUser.password, 10);
    return this.userService.create(signUpUser);
  }

  private async createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return this.jwtService.signAsync(payload);
  }
}

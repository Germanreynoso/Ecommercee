import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInUser: SignInAuthDto) {
    const user = await this.userService.findByEmail(signInUser.email);
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    console.log('User from DB:', user);
    console.log('Password from request:', signInUser.password);
    console.log('Password from DB:', user.password);

    const isPasswordMatching = await bcrypt.compare(signInUser.password, user.password);
    console.log('Password matching:', isPasswordMatching);

    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }

    const token = await this.createToken(user);
    return { token };
  }

  async signUp(signUpUser: SignUpAuthDto) {
    if (signUpUser.password !== signUpUser.passwordConfirm) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(signUpUser.password, 10);
    signUpUser.password = hashedPassword;
    signUpUser.role = Role.User;

    return this.userService.create(signUpUser);
  }

  private async createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return this.jwtService.signAsync(payload, { expiresIn: '1h' }); // Definir expiración
  }
}

import { UsersService } from 'src/users/users.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    signIn(signInUser: SignInAuthDto): Promise<{
        token: string;
    }>;
    signUp(signUpUser: SignUpAuthDto): Promise<User>;
    private createToken;
}

import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { Request } from 'express';
import { userResponseDTO } from 'src/users/dto/response-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(credentials: SignInAuthDto): Promise<{
        token: string;
    }>;
    signUp(signUpUser: SignUpAuthDto, request: Request): Promise<userResponseDTO>;
    getAuth0Protected(request: Request): string;
}

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { userResponseDTO } from 'src/users/dto/response-user.dto';
import { throwDeprecation } from 'process';



describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const hashedPassword = await hash('German37997873.',10);
    const mocksUserService: Partial<UsersService> ={
      findByEmail: (email: string) => {
        if (email === 'germanreynoso94@gmail.com'){
          return Promise.resolve({
            email: 'germanreynoso94@gmail.com',
            password: hashedPassword,
            administrator: 'user',
          }as User);
        } else {
          return Promise.resolve(undefined);
        }
      },
      create: (entitityLike?: Partial<User>): Promise<User> =>
        Promise.resolve({
          ...entitityLike,
          administrator: 'user',
          id: '10e2fded-e3e5-4c6d-b0c5-cab3f124f1da',
        }as User),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {signAsync: ()=> Promise.resolve('mockJwtToken')},
        },
        {
          provide: UsersService,
          useValue: mocksUserService
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });
  const mocksignUpUser = new SignUpAuthDto({
    name: 'German Reynoso',
    createdAt: '27/08/2024',
    password: 'German37997873.',
    passwordConfirm: 'German37997873.',
    email: 'germanreynoso94@gmail.com',
    address: 'alberdi 616',
    phone: '+543816789468',
  });
  const mockSignInUser = new SignInAuthDto({
    email: 'germanreynoso94@gmail.com',
    password: 'German37997873.',
  })


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('signUp() should return a new UserReponseDto and create User', async ()=> {
    const mockRequest = {}
    const user = await controller.signUp(mocksignUpUser, mockRequest)
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(userResponseDTO);
    expect(user).toHaveProperty('id');
  });
  it ('signIn() should return a token', async ()=> {
    const token = await controller.signIn(mockSignInUser);
    console.log(token)
    expect(token).toBeDefined();
    expect(token).toHaveProperty('token')
  })
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { userResponseDTO } from '../users/dto/response-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';


describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const hashedPassword = await hash('German37997873.', 10);

    const mocksUserService: Partial<UsersService> = {
      findByEmail: (email: string) => {
        if (email === 'germanreynoso94@gmail.com') {
          return Promise.resolve({
            id: '10e2fded-e3e5-4c6d-b0c5-cab3f124f1da',
            email: 'germanreynoso94@gmail.com',
            password: hashedPassword,
            phone: '+543816789468',
            country: 'Argentina',
            city: 'Buenos Aires',
            address: 'alberdi 616',
            name: 'German Reynoso',
            role: 'user',
            createdAt: new Date('2024-08-27T00:00:00Z'), // Cambiado a Date
            orders: [],
          } as User);
        } else {
          return Promise.resolve(undefined);
        }
      },
      create: (createUserDto: CreateUserDto): Promise<User> =>
        Promise.resolve({
          id: '10e2fded-e3e5-4c6d-b0c5-cab3f124f1da',
          email: createUserDto.email,
          password: createUserDto.password,
          phone: createUserDto.phone ?? '+543816789468',
          country: createUserDto.country ?? 'Argentina',
          city: createUserDto.city ?? 'Buenos Aires',
          address: createUserDto.address,
          name: createUserDto.name,
          role: 'user',
          createdAt: new Date(createUserDto.createdAt), // Cambiado a Date
          orders: [],
        } as User),
    };

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
          useValue: { signAsync: () => Promise.resolve('mockJwtToken') },
        },
        {
          provide: UsersService,
          useValue: mocksUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  const mockSignUpUser = new SignUpAuthDto({
    name: 'German Reynoso',
    createdAt: new Date('2024-08-27T00:00:00Z'), // Cambiado a Date
    password: 'German37997873.',
    passwordConfirm: 'German37997873.',
    email: 'germanreynoso94@gmail.com',
    address: 'alberdi 616',
    phone: '+543816789468',
  });

  const mockSignInUser = new SignInAuthDto({
    email: 'germanreynoso94@gmail.com',
    password: 'German37997873.',
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signUp() should return a new UserResponseDto and create User', async () => {
    const mockRequest = {};
    const user = await controller.signUp(mockSignUpUser, mockRequest);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(userResponseDTO);
    expect(user).toHaveProperty('id');
  });

  it('signIn() should return a token', async () => {
    const token = await controller.signIn(mockSignInUser);
    console.log(token);
    expect(token).toBeDefined();
    expect(token).toHaveProperty('token');
  });
});

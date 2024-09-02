import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockUserService:Partial<UsersService>={ 
    findByEmail: () => Promise.resolve(undefined),
    create:(entityLike?: Partial<User>)=>
      Promise.resolve({
        ...entityLike,
        administrator: 'user',
        id: '10e2fded-e3e5-4c6d-b0c5-cab3f124f1da',
      } as User),
    } 
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue:{},
        },
        {
          provide: JwtService,
          useValue:{},
        },
        {
          provide:UsersService,
          useValue: mockUserService
        }
        
      ]
    }).compile()
    service = module.get<AuthService>(AuthService)

  });
  const mockUser = new SignUpAuthDto({
    name: 'German Reynoso',
    password: 'German37997873.',
    passwordConfirm: 'German37997873.',
    email: 'germanreynoso94@gmail.com',
    address: 'alberdi 616',
    phone: '+543816789468',
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it ('signUp() create a new user whit encrypted password', async () =>{
    const user  = await service.signUp(mockUser)
    console.log('MockUser', user)
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('administrator', 'user')
    expect(user).toHaveProperty('password')
    
  })
});

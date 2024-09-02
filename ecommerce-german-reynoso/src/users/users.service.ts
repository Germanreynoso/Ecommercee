import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { userResponseDTO } from './dto/response-user.dto';
import { Role } from '../auth/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

 
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Eliminar el hash de la contraseña aquí
    const newUser = this.userRepository.create({
      ...createUserDto,
      role: Role.User,
    });
    return this.userRepository.save(newUser);
  }

  
  async findAll(page: number, limit: number): Promise<User[]> {
    return this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<userResponseDTO> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });
    
    return new userResponseDTO(updatedUser);
  };
}

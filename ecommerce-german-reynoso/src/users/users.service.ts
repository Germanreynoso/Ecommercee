import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { userResponseDTO } from './dto/response-user.dto'; // Asegúrate de que este archivo exporte `userResponseDTO`

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    return this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }
  async findOne(id: string): Promise<userResponseDTO> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'], // Asegúrate de cargar la relación con órdenes
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Map the orders to include only id and date
    const orders = user.orders.map(order => ({
      id: order.id,
      date: order.date,
    }));

    return new userResponseDTO({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      country: user.country,
      city: user.city,
      orders,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return true;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<userResponseDTO> {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = await this.userRepository.findOneBy({ id });
    return new userResponseDTO(updatedUser);
  }
}

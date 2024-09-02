import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { userResponseDTO } from './dto/response-user.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly saltRounds;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(page: number, limit: number): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<boolean>;
    findByEmail(email: string): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<userResponseDTO>;
}

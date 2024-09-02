import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponseDTO } from './dto/response-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, request: any): Promise<import("./entities/user.entity").User>;
    findOne(id: string): Promise<userResponseDTO>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<userResponseDTO>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findAll(page: number, limit: number): Promise<userResponseDTO[]>;
}

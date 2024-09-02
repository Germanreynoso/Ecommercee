import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersRepository {
    private users;
    findAll(): {
        id: number;
        email: string;
        name: string;
        password: string;
        address: string;
        phone: string;
        country: string;
        city: string;
    }[];
    findOneByEmail(email: string): {
        id: number;
        email: string;
        name: string;
        password: string;
        address: string;
        phone: string;
        country: string;
        city: string;
    };
    findOne(id: number): {
        id: number;
        email: string;
        name: string;
        password: string;
        address: string;
        phone: string;
        country: string;
        city: string;
    };
    remove(id: number): number;
    update(id: number, updateUserDto: UpdateUserDto): {
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        country: string;
        city: string;
        createdAt?: Date;
        id: number;
    };
}

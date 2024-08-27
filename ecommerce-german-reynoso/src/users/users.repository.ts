import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersRepository {
    private users = [
        {
            id: 1,
            email: 'alice.smith@example.com',
            name: 'Alice Smith',
            password: 'password123',
            address: '123 Elm Street',
            phone: '123-456-7890',
            country: 'USA',
            city: 'New York'
        },
        {
            id: 2,
            email: 'bob.johnson@example.com',
            name: 'Bob Johnson',
            password: 'password456',
            address: '456 Oak Avenue',
            phone: '234-567-8901',
            country: 'USA',
            city: 'Los Angeles'
        },
        {
            id: 3,
            email: 'charlie.brown@example.com',
            name: 'Charlie Brown',
            password: 'password789',
            address: '789 Pine Road',
            phone: '345-678-9012',
            country: 'USA',
            city: 'Chicago'
        },
        {
            id: 4,
            email: 'diana.prince@example.com',
            name: 'Diana Prince',
            password: 'password321',
            address: '101 Maple Lane',
            phone: '456-789-0123',
            country: 'USA',
            city: 'Houston'
        },
        {
            id: 5,
            email: 'eve.adams@example.com',
            name: 'Eve Adams',
            password: 'password654',
            address: '202 Birch Street',
            phone: '567-890-1234',
            country: 'USA',
            city: 'Phoenix'
        }
    ];

    findAll() {
        return this.users;
    }

    

    findOneByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    remove(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        return id;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const user = this.findOne(id);
        if (!user) return null;
        
        const updatedUser = {
            ...user,
            ...updateUserDto
        };
        this.users = this.users.map(user => user.id === id ? updatedUser : user);
        return updatedUser;
    }
}

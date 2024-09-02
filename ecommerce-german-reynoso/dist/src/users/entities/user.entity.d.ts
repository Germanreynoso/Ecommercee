import { Order } from 'src/orders/entities/order.entity';
export declare enum Role {
    User = "user",
    Admin = "admin"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    name: string;
    orders: Order[];
    createdAt: Date;
    role: Role;
}

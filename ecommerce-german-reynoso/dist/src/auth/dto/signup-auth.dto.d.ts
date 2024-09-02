import { Role } from "../roles.enum";
export declare class SignUpAuthDto {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    address: string;
    phone: string;
    country?: string;
    city: string;
    createdAt: Date;
    role?: Role;
    constructor(partial: Partial<SignUpAuthDto>);
}

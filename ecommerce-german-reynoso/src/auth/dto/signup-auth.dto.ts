import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, isString, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "../roles.enum";

export class SignUpAuthDto{
  @MaxLength(80)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email:string;
  
  @Matches(/^(?!.*(.)\1{2})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,15}$/, {
    message: 'Password is too weak. It must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, one special character, no spaces, and no more than two consecutive identical characters.',
  },
  )
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;

  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city:string;

  @IsString()
  @IsOptional()
  createdAt: Date;
  @IsString()
  @IsOptional()
  role?: Role;

  constructor(partial: Partial<SignUpAuthDto>){
    Object.assign(this, partial)
  }

}
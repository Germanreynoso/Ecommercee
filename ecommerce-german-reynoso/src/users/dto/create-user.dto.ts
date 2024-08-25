import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
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

  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city:string;

  @IsString()
  @IsOptional()
  createdAt: string;

}
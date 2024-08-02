import { IsEmail, IsOptional, IsString, Matches } from "class-validator";

export class CreateUserDto{
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'La contraseña es demasiado débil. Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.',
  })
  password: string;
  @IsString()
  address: string;
  @IsString()
  phone: string;
  @IsString()
  @IsOptional()
  country: string;
  city: string;
   }
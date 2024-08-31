import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'The name of the user',
    required: true,
  })
  @MaxLength(80)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
  })
  @Matches(/^(?!.*(.)\1{2})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,15}$/, {
    message: 'Password is too weak. It must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, one special character, no spaces, and no more than two consecutive identical characters.',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    description: 'The address of the user',
    required: true,
  })
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    description: 'The phone of the user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'The country of the user',
    required: true,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    type: String,
    description: 'The city of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    type: String,
    description: 'The created date of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  createdAt?: string;
}

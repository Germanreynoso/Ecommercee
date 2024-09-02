import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  constructor(partial: Partial<SignInAuthDto>) {
    Object.assign(this, partial);
  }
}

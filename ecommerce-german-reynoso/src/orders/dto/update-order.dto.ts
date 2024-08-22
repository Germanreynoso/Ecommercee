import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  userId?: string;

  // Agrega otros campos opcionales si es necesario
}

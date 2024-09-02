import { IsString, IsOptional } from 'class-validator';

export class SomeAdminDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}

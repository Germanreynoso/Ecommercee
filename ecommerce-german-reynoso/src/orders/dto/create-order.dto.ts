import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductId {
  @ApiProperty({
    type: String,
    description: 'Product ID',
    required: true,
  })
  @IsUUID()
  @IsString()
  id: string;

  @ApiProperty({
    type: Number,
    description: 'Quantity of the product',
    required: true,
  })
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    type: String,
    description: 'The user ID associated with the order',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: [ProductId],
    description: 'List of products included in the order',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductId)
  products: ProductId[];
}

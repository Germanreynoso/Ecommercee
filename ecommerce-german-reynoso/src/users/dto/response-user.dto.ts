import { ApiProperty } from '@nestjs/swagger';

export class userResponseDTO {
  @ApiProperty({
    type: String,
    description: 'The uuid of the user, assigned by the database',
    required: true,
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The name of the user',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The email of the user',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'The address of the user',
    required: true,
  })
  address: string;

  @ApiProperty({
    type: String,
    description: 'The phone of the user',
    required: true,
  })
  phone: string;

  @ApiProperty({
    type: String,
    description: 'The country of the user',
    required: true,
  })
  country: string;

  @ApiProperty({
    type: String,
    description: 'The city of the user',
    required: false,
  })
  city?: string;

  @ApiProperty({
    type: [Object],
    description: 'The list of orders with id and date',
  })
  orders: { id: string; date: Date }[];

  constructor(partial: Partial<userResponseDTO>) {
    const { id, name, email, address, phone, country, city, orders } = partial;
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.country = country;
    this.city = city;
    this.orders = orders;
  }
}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({nullable: true})
  address: string; 

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string; 

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column()
  createdAt: string;
  @Column({default: Role.User })
  administrator: string
}

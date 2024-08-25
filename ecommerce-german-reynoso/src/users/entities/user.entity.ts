import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity'; 

@Entity()
export class User {

  @PrimaryColumn()
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

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column()
  createdAt: string;
}

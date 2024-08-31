

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
  
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  details: OrderDetail[]; 
  
}

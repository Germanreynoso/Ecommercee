import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
  
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  details: OrderDetail[];
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Order, (order) => order.details)
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable() // Esto crea la tabla de unión para la relación muchos a muchos
  products: Product[];
}

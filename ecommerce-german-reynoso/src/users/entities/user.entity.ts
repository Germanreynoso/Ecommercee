import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // Utiliza 'uuid' para generar un ID único automáticamente
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
  address: string; // Agregado

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string; // Agregado

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column()
  createdAt: string;
}

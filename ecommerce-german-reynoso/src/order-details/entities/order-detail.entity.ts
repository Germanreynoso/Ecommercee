import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
@Entity()
export class OrderDetail {
  @PrimaryColumn() // Usar cadena de texto como identificador primario
  id: string; // Identificador de tipo string

  @Column('decimal')
  price: number;

  @Column('json') // Asegúrate de que este tipo sea compatible con la estructura de productos
  products: object[];

  @ManyToOne(() => Order, (order) => order.details)
  order: Order; // Relación con Order
}

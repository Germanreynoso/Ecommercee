import { Order } from 'src/orders/entities/order.entity';

export class OrderResponseDto {
  id: string;
  date: Date;
  user: {
    id: string;
    orders: Array<{
      id: string;
      date: Date;
    }>;
  };

  constructor(order: Order) {
    this.id = order.id;
    this.date = order.date;
    this.user = {
      id: order.user.id,
      orders: order.user.orders.map(o => ({
        id: o.id,
        date: o.date,
      })),
    };
  }
}

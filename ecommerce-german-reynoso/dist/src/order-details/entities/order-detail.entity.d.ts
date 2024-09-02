import { Order } from 'src/orders/entities/order.entity';
export declare class OrderDetail {
    id: string;
    price: number;
    products: object[];
    order: Order;
}

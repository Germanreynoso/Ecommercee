import { Order } from "src/orders/entities/order.entity";

export class CreateOrderDetailDto{
    price: number;
    order: Order;
    products: Array<object>;
}
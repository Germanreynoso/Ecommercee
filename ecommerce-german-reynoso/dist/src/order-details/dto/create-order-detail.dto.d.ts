import { Order } from "src/orders/entities/order.entity";
export declare class CreateOrderDetailDto {
    price: number;
    order: Order;
    products: Array<object>;
}

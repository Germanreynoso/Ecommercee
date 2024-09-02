import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
export declare class Order {
    id: string;
    date: Date;
    user: User;
    details: OrderDetail[];
}

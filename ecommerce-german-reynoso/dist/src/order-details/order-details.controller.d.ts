import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
export declare class OrderDetailsController {
    private readonly orderDetailsService;
    constructor(orderDetailsService: OrderDetailsService);
    create(createOrderDetailDto: CreateOrderDetailDto): Promise<import("./entities/order-detail.entity").OrderDetail>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): string;
    remove(id: string): string;
}

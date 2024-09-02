import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("./dto/response-order.dto").OrderResponseDto>;
    findAll(): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: string): Promise<import("../order-details/entities/order-detail.entity").OrderDetail[]>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("../order-details/entities/order-detail.entity").OrderDetail[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { Order } from './entities/order.entity';
import { OrderResponseDto } from './dto/response-order.dto';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly userService;
    private readonly productService;
    private readonly orderDetailsService;
    constructor(orderRepository: Repository<Order>, userService: UsersService, productService: ProductsService, orderDetailsService: OrderDetailsService);
    create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    private calculateTotal;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<import("../order-details/entities/order-detail.entity").OrderDetail[]>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("../order-details/entities/order-detail.entity").OrderDetail[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

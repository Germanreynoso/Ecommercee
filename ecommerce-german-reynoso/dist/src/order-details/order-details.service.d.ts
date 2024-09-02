import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';
export declare class OrderDetailsService {
    private readonly orderDetailRepository;
    constructor(orderDetailRepository: Repository<OrderDetail>);
    create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): string;
    remove(id: string): string;
    findOneByOrderId(orderId: string, relations?: string[]): Promise<OrderDetail[]>;
    removeByOrderId(orderId: string): Promise<void>;
}

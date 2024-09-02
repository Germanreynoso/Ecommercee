import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { OrderDetailsService } from '../order-details/order-details.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto, ProductIdDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDetailDto } from '../order-details/dto/create-order-detail.dto';
import { OrderResponseDto } from './dto/response-order.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    
    // Check if user exists
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new HttpException(`User with id ${userId} not found.`, HttpStatus.BAD_REQUEST);
    }

    // Create a new order
    const order = this.orderRepository.create({
      user: user,
      date: new Date(),
    });

    // Save the order
    const orderEntity = await this.orderRepository.save(order);
    
    // Calculate total price
    const total = await this.calculateTotal(products);

    // Prepare and create order details
    const orderDetail = new CreateOrderDetailDto();
    orderDetail.price = total;
    orderDetail.products = products;
    orderDetail.order = orderEntity;

    // Save order details
    const orderDetailEntity = await this.orderDetailsService.create(orderDetail);
    return new OrderResponseDto(orderDetailEntity);
  }

  private async calculateTotal(products: Array<ProductIdDto>): Promise<number> {
    let total = 0;
    for (const product of products) {
      total += await this.productService.buyProduct(product.id);
    }
    return total;
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['user', 'details'],
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'details'],
    });

    if (!order) {
      throw new HttpException(`Order with id ${id} not found.`, HttpStatus.NOT_FOUND);
    }

    const orderDetail = await this.orderDetailsService.findOneByOrderId(order.id, ['products', 'order']);
    return orderDetail;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const result = await this.orderRepository.update(id, updateOrderDto);

    if (result.affected === 0) {
      throw new HttpException(`Order with id ${id} not found.`, HttpStatus.NOT_FOUND);
    }

    const updatedOrder = await this.findOne(id);
    return updatedOrder;
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    if (order) {
      await this.orderDetailsService.removeByOrderId(id);
      await this.orderRepository.delete(id);
      return { message: `Order with id ${id} has been removed.` };
    } else {
      throw new HttpException(`Order with id ${id} not found.`, HttpStatus.NOT_FOUND);
    }
  }
}

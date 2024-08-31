import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersRepository } from './orders.repository';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderResponseDto } from './dto/response-order.dto';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from 'src/order-details/dto/create-order-detail.dto';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { ProductsService } from 'src/products/products.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductId } from './dto/create-order.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrdersRepository,
    private readonly userService: UsersService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly productService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const { userId, products } = createOrderDto;
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    const order = this.orderRepository.create({
      user,
      date: new Date(),
    });

    const orderEntity = await this.orderRepository.save(order);
    const total = await this.calculateTotal(products);

    const orderDetailDto = new CreateOrderDetailDto();
    orderDetailDto.price = total;
    orderDetailDto.products = products;
    orderDetailDto.order = orderEntity;

    const orderDetailEntity = await this.orderDetailsService.create(orderDetailDto);
    return new OrderResponseDto(orderDetailEntity);
  }

  private async calculateTotal(products: ProductId[]): Promise<number> {
    let total = 0;
    for (const product of products) {
      total += await this.productService.buyProduct(product.id);
    }
    return total;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'details'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'details'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found.`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const result = await this.orderRepository.update(id, updateOrderDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Order with id ${id} not found.`);
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const order = await this.findOne(id);

    if (order) {
      await this.orderDetailsService.removeByOrderId(id);
      await this.orderRepository.delete(id);
      return { message: `Order with id ${id} has been removed.` };
    } else {
      throw new NotFoundException(`Order with id ${id} not found.`);
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto, ProductId } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { Order } from './entities/order.entity';
import { profile } from 'console';
import { CreateOrderDetailDto } from 'src/order-details/dto/create-order-detail.dto';
import { OrderResponseDto } from './dto/response-order.dto';
@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    private readonly orderDetailsService: OrderDetailsService,
  ){}
  
  async create(createOrderDto: CreateOrderDto){
    const {userId, products} = createOrderDto;
    const user = await this.userService.findOne(userId);
    const order = {
      user: user,
      date: new Date(),
    };
    const orderEntity = await this.orderRepository.save(
      this.orderRepository.create(order),
    );
    const total = await this.calculateTotal(products);

    const orderDetail = new CreateOrderDetailDto();
    orderDetail.price = total;
    orderDetail.products = products;
    orderDetail.order = orderEntity;

    const orderDetailEntity = 
      await this.orderDetailsService.create(orderDetail);

    return new OrderResponseDto(orderDetailEntity)
  }
  private async calculateTotal(products: Array<ProductId>): Promise<number> {
    let total = 0;
    for (const product of products) {
      const productId = Number(product.id); // Convierte el id a número
      total += await this.productService.buyProduct(productId);
    }
    return total;
  }
  
  async findAll() {
    return this.orderRepository.find({
      relations: ['user', 'details'], 
    });
  }
  
  async findOne(id: string){
    const order = await this.orderRepository.findOneBy({id});
    const orderDetail = await this.orderDetailsService.findOneByOrderId(
      order.id,
      ['products', 'order'],
    );
    return orderDetail;
  }
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.orderRepository.update(id, updateOrderDto);
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
      throw new Error(`Order with id ${id} not found.`);
    }
  }
  
    
    
  }

  
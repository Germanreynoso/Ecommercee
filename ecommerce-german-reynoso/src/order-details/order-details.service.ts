import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';

@Injectable()

export class OrderDetailsService {

  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
    const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
    return this.orderDetailRepository.save(orderDetail);
  }


  findAll() {
    return `This action returns all orderDetails`;
  }

  findOne(id: string) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: string) {
    return `This action removes a #${id} orderDetail`;
  }

  async findOneByOrderId(
    orderId: string,
    relations: string[] = [],
  ): Promise<OrderDetail[]> {
    return await this.orderDetailRepository.find({
      where: {
        order: {
          id: orderId,
        },
      },
      relations: relations,
    });
  }

  async removeByOrderId(orderId: string): Promise<void> {
    await this.orderDetailRepository.delete({ order: { id: orderId } });
  }

  
}

import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { OrderDetailsModule } from '../order-details/order-details.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order, OrderDetail, User, Product]), 
    UsersModule,
    ProductsModule,
    OrderDetailsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports:[OrdersService]
})
export class OrdersModule {}

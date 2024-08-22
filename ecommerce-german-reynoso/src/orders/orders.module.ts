import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetailsModule } from 'src/order-details/order-details.module';

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

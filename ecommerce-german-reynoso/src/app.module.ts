// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { ProductsModule } from './products/products.module';
// import { OrderDetailsModule } from './order-details/order-details.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { PostgresDataSourceConfig } from './config/data-source';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CategoriesModule } from './categories/categories.module';
// import { OrdersModule } from './orders/orders.module';
// import { SeedsModule } from './seeds/seeds.module';
// import { OrderDetail } from './order-details/entities/order-detail.entity';
// import { Order } from './orders/entities/order.entity';
// import { Product } from './products/entities/product.entity';
// import { User } from './users/entities/user.entity';
// import { Category } from './categories/entities/category.entity';

// @Module({ 
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [PostgresDataSourceConfig],
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST'),
//         port: +configService.get<number>('DB_PORT'),
//         username: configService.get<string>('DB_USERNAME'),
//         password: configService.get<string>('DB_PASSWORD'),
//         database: configService.get<string>('DB_NAME'),
//         entities: [Order, OrderDetail, Product,User,Category], // Agrega tus entidades aquí
//         synchronize: true,
//       }),
//       inject: [ConfigService],
//     }),
//     UsersModule,
//     AuthModule,
//     ProductsModule,
//     OrderDetailsModule,
//     CategoriesModule,
//     SeedsModule,
//     OrdersModule,

//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresDataSourceConfig } from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { SeedsModule } from './seeds/seeds.module';
import { OrderDetail } from './order-details/entities/order-detail.entity';
import { Order } from './orders/entities/order.entity';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [PostgresDataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Order, OrderDetail, Product, User, Category],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrderDetailsModule,
    CategoriesModule,
    SeedsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

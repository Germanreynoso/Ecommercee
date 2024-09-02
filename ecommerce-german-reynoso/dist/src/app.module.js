"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const order_details_module_1 = require("./order-details/order-details.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("./orders/orders.module");
const seeds_module_1 = require("./seeds/seeds.module");
const order_detail_entity_1 = require("./order-details/entities/order-detail.entity");
const order_entity_1 = require("./orders/entities/order.entity");
const product_entity_1 = require("./products/entities/product.entity");
const user_entity_1 = require("./users/entities/user.entity");
const category_entity_1 = require("./categories/entities/category.entity");
const cloudinary_service_1 = require("./service/cloudinary/cloudinary.service");
const file_upload_module_1 = require("./file-upload/file-upload.module");
const shared_module_1 = require("./shared/shared/shared.module");
const clodinary_module_1 = require("./service/cloudinary/clodinary-module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env'],
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [order_entity_1.Order, order_detail_entity_1.OrderDetail, product_entity_1.Product, user_entity_1.User, category_entity_1.Category],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            order_details_module_1.OrderDetailsModule,
            categories_module_1.CategoriesModule,
            seeds_module_1.SeedsModule,
            orders_module_1.OrdersModule,
            file_upload_module_1.FileUploadModule,
            shared_module_1.SharedModule,
            admin_module_1.AdminModule,
            clodinary_module_1.CloudinaryModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, cloudinary_service_1.CloudinaryService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
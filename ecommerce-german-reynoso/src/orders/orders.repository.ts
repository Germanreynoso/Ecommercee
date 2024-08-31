import { EntityRepository, Repository, In } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {

  async getOrder(id: string): Promise<Order | undefined> {
    return this.findOne({
      where: { id },
      relations: ['details', 'details.product']
    });
  }

  async addOrder(userId: string, productIds: string[]): Promise<Order> {
    // Encuentra el usuario
    const user = await this.manager.findOne(User, { where: { id: userId } });
    if (!user) throw new Error('User not found');

    // Crea una nueva orden
    const order = new Order();
    order.user = user;
    order.date = new Date();
    await this.save(order);

    // Encuentra los productos
    const products = await this.manager.findBy(Product, { id: In(productIds) });
    const validProducts = products.filter(product => product.stock > 0);

    let totalPrice = 0;
    const orderDetails: OrderDetail[] = [];

    for (const product of validProducts) {
      totalPrice += product.price;

      // Reduce el stock del producto
      product.stock -= 1;
      await this.manager.save(product);

      // Crea el detalle de la orden
      const orderDetail = new OrderDetail();
      orderDetail.price = product.price;
      orderDetail.order = order;
      orderDetail.products = [product];  // Actualización: usar products en lugar de product
      await this.manager.save(orderDetail);  // Guarda cada detalle de la orden

      orderDetails.push(orderDetail);
    }

    // Adjunta los detalles de la orden a la orden
    order.details = orderDetails;
    await this.save(order);

    return order;
  }
}

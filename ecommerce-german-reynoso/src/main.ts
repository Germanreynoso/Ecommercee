import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import 'reflect-metadata'
import { CategoriesSeeds } from './seeds/categories/categories.seeds';
import { ProductSeed } from './seeds/products/products-seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  const categoriesSeeds = app.get(CategoriesSeeds);
  await categoriesSeeds.seed();

  console.log('La inserción de categorias ha terminado');
  const productSeed=app.get(ProductSeed);
  await productSeed.seed();
  console.log('La inserción de productos ha terminado ')
  await app.listen(3000);
}
bootstrap();

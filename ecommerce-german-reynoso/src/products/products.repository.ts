import { Injectable } from "@nestjs/common";

@Injectable()
export class ProducRepository{
    private products = [
        {
            id: 1,
            name: 'Laptop',
            price: 999.99
          },
          {
            id: 2,
            name: 'Smartphone',
            price: 499.99
          },
          {
            id: 3,
            name: 'Tablet',
            price: 299.99
          },
          {
            id: 4,
            name: 'Headphones',
            price: 89.99
          },
          {
            id: 5,
            name: 'Smartwatch',
            price: 199.99
          }
    ]

    findAll(){
        return this.products;
    }
}




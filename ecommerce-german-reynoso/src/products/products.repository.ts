import { Injectable } from "@nestjs/common";

@Injectable()
export class ProducRepository{
    private products = [
      {
        id: 1,
        name: 'Laptop',
        description: 'High performance laptop',
        price: 999.99,
        stock: true,
        imgUrl: 'https://example.com/laptop.jpg'
    },
    {
        id: 2,
        name: 'Smartphone',
        description: 'Latest model smartphone',
        price: 499.99,
        stock: true,
        imgUrl: 'https://example.com/smartphone.jpg'
    },
    {
        id: 3,
        name: 'Tablet',
        description: 'Lightweight tablet with great battery life',
        price: 299.99,
        stock: true,
        imgUrl: 'https://example.com/tablet.jpg'
    },
    {
        id: 4,
        name: 'Headphones',
        description: 'Noise-cancelling over-ear headphones',
        price: 89.99,
        stock: true,
        imgUrl: 'https://example.com/headphones.jpg'
    },
    {
        id: 5,
        name: 'Smartwatch',
        description: 'Smartwatch with fitness tracking',
        price: 199.99,
        stock: true,
        imgUrl: 'https://example.com/smartwatch.jpg'
    }
    ]

    findAll(){
        return this.products;
    }
}




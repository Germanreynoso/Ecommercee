import { Category } from 'src/categories/entities/category.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    stock: number;
    category: Category;
}

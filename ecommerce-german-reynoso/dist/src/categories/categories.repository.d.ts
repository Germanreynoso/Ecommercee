import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
export declare class CategoriesRepository extends Repository<Category> {
    getCategories(): Promise<Category[]>;
    addCategories(categories: Category[]): Promise<Category[]>;
    findCategoryByName(name: string): Promise<Category | undefined>;
}

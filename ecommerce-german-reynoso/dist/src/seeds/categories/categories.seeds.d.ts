import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
export declare class CategoriesSeeds {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    seed(): Promise<void>;
}

import { Repository, EntityRepository, Like } from 'typeorm';
import { Category } from './entities/category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository extends Repository<Category> {
  
  async getCategories(): Promise<Category[]> {
    return this.find();
  }

  async addCategory(category: Partial<Category>): Promise<Category> {
    const newCategory = this.create(category);
    return this.save(newCategory);
  }

  async findOneById(id: string): Promise<Category | null> {
    return this.findOne({ where: { id } });
  }
}

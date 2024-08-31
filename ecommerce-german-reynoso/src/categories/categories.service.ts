import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async seedCategories(): Promise<void> {
    const existingCategories = await this.categoriesRepository.getCategories();
    const categoryNames = new Set(existingCategories.map(cat => cat.name));

    const categoriesData = [
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Clothing' },
      // Más categorías según sea necesario
    ];

    for (const category of categoriesData) {
      if (!categoryNames.has(category.name)) {
        await this.categoriesRepository.addCategory(category);
      }
    }
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.addCategory(createCategoryDto);
  }

  findAll() {
    return this.categoriesRepository.getCategories();
  }

  findOne(id: string) {
    return this.categoriesRepository.findOneById(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoriesRepository.delete(id);
  }
}

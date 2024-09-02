import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UploadFileDto } from 'src/file-upload/dto/upload-file.dto';
export declare class ProductsService {
    private readonly productRepository;
    private readonly fileUploadService;
    constructor(productRepository: Repository<Product>, fileUploadService: FileUploadService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(page: number, limit: number): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    buyProduct(id: string): Promise<number>;
    remove(id: string): Promise<void>;
    uploadFile(file: UploadFileDto, id: string): Promise<{
        imgUrl: string;
    }>;
}

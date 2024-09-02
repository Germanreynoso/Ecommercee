import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UploadFileDto } from './dto/upload-file.dto';
export declare class FileUploadService {
    private readonly cloudinaryService;
    private files;
    constructor(cloudinaryService: CloudinaryService);
    uploadFile(file: UploadFileDto): Promise<{
        url: string;
    }>;
    create(createFileUploadDto: CreateFileUploadDto): Promise<{
        originalname: string;
        mimetype: string;
        size: number;
        buffer: string;
        id: string;
    }>;
    findAll(): Promise<CreateFileUploadDto[]>;
    findOne(id: string): Promise<CreateFileUploadDto>;
    update(id: string, updateFileUploadDto: CreateFileUploadDto): Promise<{
        originalname: string;
        mimetype: string;
        size: number;
        buffer: string;
    }>;
    remove(id: string): Promise<void>;
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        url: string;
    }>;
}

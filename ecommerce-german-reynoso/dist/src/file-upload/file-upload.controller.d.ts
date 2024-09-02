import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadImage(id: string, file: Express.Multer.File): Promise<{
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
}

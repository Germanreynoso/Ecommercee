export declare class ProductRepository {
    private products;
    findAll(): {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
    }[];
    findOne(id: number): {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
    };
    create(product: any): any;
    update(id: number, updateProduct: any): {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
    };
    remove(id: number): void;
}

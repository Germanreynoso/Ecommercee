export declare class OrderDTO {
    id: string;
    date: Date;
}
export declare class userResponseDTO {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    country: string;
    city?: string;
    orders: OrderDTO[];
    role: string;
    constructor(partial: Partial<userResponseDTO>);
}

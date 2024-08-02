export class userResponseDTO{
    name: string;
    email: string;
    address: string;
    phone: string;
    country: string;
    city?: string;

    constructor(partial: Partial<userResponseDTO>){
        const { name, email, address, phone, country, city} = partial;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.country = country;
        this.city= city
    }
}
import { INestApplication } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../../src/app.module";
import { UsersService } from "../../src/users/users.service";
import { Test } from "@nestjs/testing";
import { User } from "../../src/users/entities/user.entity";
import { hash } from "bcrypt";
import { Role } from "../../src/auth/roles.enum";
import * as request from 'supertest';

describe('User (2e)', () => {
    let app: INestApplication;
    let authToken: string;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule, TypeOrmModule.forRoot()],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        usersService = moduleFixture.get<UsersService>(UsersService);
        const hashedPassword = await hash('German37997873.', 10);

        // Mock implementation for findByEmail
        jest.spyOn(usersService, 'findByEmail').mockImplementation(async (email: string) => {
            if (email === 'germanreynoso94@gmail.com') {
                return Promise.resolve({
                    id: 'some-uuid', // Make sure to use a valid UUID here
                    email: 'germanreynoso94@gmail.com',
                    password: hashedPassword,
                    phone: '1234567890',
                    country: 'CountryName',
                    city: 'CityName',
                    address: 'Some Address',
                    name: 'User Name',
                    createdAt: new Date(),
                    role: Role.User, // Make sure this field is included
                } as User);
            } else {
                return Promise.resolve(undefined);
            }
        });

        // Mock implementation for findAll
        jest.spyOn(usersService, 'findAll').mockImplementation(async () => {
            return Promise.resolve([
                {
                    id: 'some-uuid',
                    email: 'germanreynoso94@gmail.com',
                    password: hashedPassword,
                    phone: '1234567890',
                    country: 'CountryName',
                    city: 'CityName',
                    address: 'Some Address',
                    name: 'User Name',
                    createdAt: new Date(),
                    role: Role.User,
                } as User
            ]);
        });

        // Login to obtain the token
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/signin')
            .send({
                email: 'germanreynoso94@gmail.com', // Corrected email
                password: 'German37997873.',
            });

        authToken = loginResponse.body['token'];
    });

    afterEach(async () => {
        await app.close();
    });

    it('/users (GET) should return an array with users and OK status', async () => {
        const req = await request(app.getHttpServer())
            .get('/users')
            .set('Authorization', `Bearer ${authToken}`); // Added space after Bearer

        console.log('TOKEN', authToken);
        console.log('Request', req.body);

        expect(req.status).toBe(200);
        expect(req.body).toBeInstanceOf(Array);
        expect(req.body).toHaveLength(1); // Assuming you expect 1 user in the array
    });
});

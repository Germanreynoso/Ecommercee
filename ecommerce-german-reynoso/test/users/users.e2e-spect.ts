import { INestApplication } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { UsersService } from "src/users/users.service";
import { Test } from "@nestjs/testing";
import { User } from "src/users/entities/user.entity";
import { hash } from "bcrypt";
import *as request from 'supertest'
import exp from "constants";

describe ('User (2e)',() =>{
    let app: INestApplication;
    let authToken: string;
    let usersService: UsersService

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule, TypeOrmModule],
        }).compile()

        app = moduleFixture.createNestApplication();
        app.init(); 

        usersService = moduleFixture.get<UsersService>(UsersService);
        const hashedPassword = await hash('German37997873.', 10)
        jest.spyOn(usersService, 'findByEmail').mockImplementation(async(email) => {
            if (email === 'germanreynoso94@gmail.com'){
                return Promise.resolve({
                    email: 'germanreynoso@gmail.com',
                    password: hashedPassword,
                    administrator: 'user',
                } as User)
            } else{
                Promise.resolve(undefined)
            }
        });
        jest.spyOn(usersService, 'findAll').mockImplementation(async () => {
            return Promise.resolve([
                {
                    email:'germanreynoso94@gmail.com',
                    administrator:'user',
                }
            ]as User[])
        });
        
        const loginResponse = await request (app.getHttpServer())
        .post('/auth/signin')
        .send({
            email: 'germanreynoso94♠4gmail.com',
            password:'German37997873.',
        });

        authToken = loginResponse.body['token']
    });
    afterEach(async() =>{
        await app.close();
    });

    it ('/users (GET) return array whit users and OK status', async () => {
        const req =  await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer${authToken}`);

        console.log('TOKEN', authToken);
        console.log('Request', req.body);

        expect(req.status).toBe(200);
        expect(req.body).toBeInstanceOf(Array)
    })
} ) 
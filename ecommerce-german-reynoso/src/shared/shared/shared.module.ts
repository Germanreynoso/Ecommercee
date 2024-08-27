import { Global, Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports: [ConfigModule,
        JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: async(ConfigService: ConfigService) => {
            const secret = ConfigService.get<string>('JWT_SECRET');
            if (!secret){
                throw new Error('JWT_SECRET is not defined')
            }
            return {
                secret,
                singOptions: { expiresIn: '60m'},
            };
        }
    })],
    exports:[JwtModule]
})
export class SharedModule {}

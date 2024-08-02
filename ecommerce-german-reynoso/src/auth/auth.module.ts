import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule]
})
export class AuthModule {}

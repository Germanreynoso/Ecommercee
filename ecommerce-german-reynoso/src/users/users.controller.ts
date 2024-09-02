import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus,HttpException, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponseDTO } from './dto/response-user.dto';
import { AuthGuard } from '../guard/auth.guard';
import { ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Req } from '@nestjs/common';
import { DateAdderInterceptor } from '../interceptors/date-adder.interceptors';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(DateAdderInterceptor)
  create(@Body()createUserDto: CreateUserDto,@Req()request){
    const user = {...createUserDto, createdAt: request.date};
    return this.usersService.create(user)
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);
    return new userResponseDTO(user); 
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return new userResponseDTO(updatedUser); 
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.usersService.remove(id);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: `User with id ${id} has been removed.` };
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    const users = await this.usersService.findAll(page, limit);
    return users.map(user => new userResponseDTO(user));
  }
}

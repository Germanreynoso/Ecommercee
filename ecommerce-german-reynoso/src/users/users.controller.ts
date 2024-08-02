import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponseDTO } from './dto/response-user.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
    @Get()
  
    @HttpCode(HttpStatus.OK)
    findAll(
      @Query('page') page : number = 1,
      @Query('limite') limite :  number = 10,
    ) {
      return this.usersService.findAll();
    }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);
    return new userResponseDTO(user)
    }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

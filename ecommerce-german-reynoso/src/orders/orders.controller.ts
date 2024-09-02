import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.ordersService.create(createOrderDto);
    } catch (error) {
      throw new HttpException('Failed to create order', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders retrieved.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll() {
    try {
      return await this.ordersService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch orders', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const order = await this.ordersService.findOne(id);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      throw new HttpException('Failed to fetch order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'Order successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    try {
      const updatedOrder = await this.ordersService.update(id, updateOrderDto);
      if (!updatedOrder) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return updatedOrder;
    } catch (error) {
      throw new HttpException('Failed to update order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order successfully removed.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const result = await this.ordersService.remove(id);
      if (!result) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return { message: `Order with id ${id} has been removed.` };
    } catch (error) {
      throw new HttpException('Failed to remove order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('order-details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order detail' })
  @ApiBody({ type: CreateOrderDetailDto })
  @ApiResponse({ status: 201, description: 'Order detail successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order details' })
  @ApiResponse({ status: 200, description: 'List of all order details retrieved.' })
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order detail by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order detail ID' })
  @ApiResponse({ status: 200, description: 'Order detail successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Order detail not found.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.orderDetailsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order detail by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order detail ID' })
  @ApiBody({ type: UpdateOrderDetailDto })
  @ApiResponse({ status: 200, description: 'Order detail successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order detail not found.' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order detail by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order detail ID' })
  @ApiResponse({ status: 200, description: 'Order detail successfully removed.' })
  @ApiResponse({ status: 404, description: 'Order detail not found.' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.orderDetailsService.remove(id);
  }
}

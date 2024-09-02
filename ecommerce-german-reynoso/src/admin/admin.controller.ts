import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guards';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @UseGuards(AdminGuard)
  getAdminDashboard() {
    return 'This is the admin dashboard';
  }
}

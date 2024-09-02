import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles || !requiredRoles.includes(Role.Admin)) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === Role.Admin) {
      return true;
    }

    throw new ForbiddenException('You do not have the necessary permissions.');
  }
}

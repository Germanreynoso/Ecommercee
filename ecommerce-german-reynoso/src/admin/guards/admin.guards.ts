import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../auth/roles.decorator';
import { Role } from '../../auth/roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtener los roles requeridos para la ruta o controlador
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Verificar si se requieren roles y si el rol 'Admin' está incluido
    if (!requiredRoles || !requiredRoles.includes(Role.Admin)) {
      return false; // No es necesario para acceder si no hay roles requeridos o 'Admin' no está incluido
    }

    // Obtener la solicitud y el usuario
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verificar si el usuario tiene el rol de 'Admin'
    if (user && user.role === Role.Admin) {
      return true;
    }

    // Lanza una excepción si el usuario no tiene permisos
    throw new ForbiddenException('You do not have the necessary permissions.');
  }
}

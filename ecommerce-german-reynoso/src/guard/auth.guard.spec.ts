import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(() => {
    // Crea mocks para JwtService y ConfigService
    jwtService = new JwtService({} as any); // Pasa un objeto vacío para evitar errores
    configService = new ConfigService();

    // Instancia AuthGuard con los mocks
    authGuard = new AuthGuard(jwtService, configService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});

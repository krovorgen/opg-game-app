import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import configuration from './config/configuration';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' && !token) {
        new UnauthorizedException(['Пользователь не авторизован']);
      }
      req.user = this.jwtService.verify(token, {
        secret: configuration().crypto.JWT_SECRET,
      });

      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(['Пользователь не авторизован']);
    }
  }
}

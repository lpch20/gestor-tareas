import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Falta el token de autenticación");
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new UnauthorizedException("Formato de token inválido");
    }

    const token = parts[1];

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new UnauthorizedException("JWT_SECRET no está configurado en el servidor");
      }
      const decoded = jwt.verify(token, secret) as any;
      request.user = decoded;
      return true;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedException("Token expirado");
      }
      if (error.name === "JsonWebTokenError") {
        throw new UnauthorizedException("Token inválido");
      }
      throw new UnauthorizedException("Error de autenticación");
    }
  }
}

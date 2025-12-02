import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class LoginController {
  constructor(private readonly authService: AuthService) {}
  
  @Post("login")
  async login(@Body() createUserDto: { username: string; password: string }) {
    try {
      const result = await this.authService.login(createUserDto);
      
      return {
        message: "Inicio de sesión exitoso",
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || "Error en el inicio de sesión",
        error.status || HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post("register")
  async register(@Body() createUserDto: { username: string; password: string }) {
    try {
      const result = await this.authService.createUser(createUserDto);

      return {
        message: "Usuario creado exitosamente",
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || "Error al crear el usuario",
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }
}

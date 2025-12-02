import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { comparePassword, encryptPassword } from "src/utils/encryptPass";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(
    createUserDto: CreateUserDto & { password: string } & { username: string }
  ) {
    const user = await this.prisma.users.findFirst({
      where: {
        username: createUserDto.username,
      },
    }) as any;

    if (!user) {
      throw new UnauthorizedException("Usuario no encontrado");
    }

    const isPasswordValid = await comparePassword(
      createUserDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Contraseña incorrecta");
    }

    const token = this.generateToken(user.id, user.username);

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async createUser(createUserDto: CreateUserDto) {

    const existingUser = await this.prisma.users.findFirst({
      where: {
        username: createUserDto.username,
      },
    });

    if (existingUser) {
      throw new UnauthorizedException("El usuario ya existe");
    }

    const user = await this.prisma.users.create({
      data: {
        username: createUserDto.username,
        password: await encryptPassword(createUserDto.password),
      } as any,
    }) as any;

    if (!user) {
      throw new UnauthorizedException("Error al crear el usuario");
    }

    const token = this.generateToken(user.id, user.username);

    if (!token) {
      throw new UnauthorizedException("Error al generar el token");
    }

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  private generateToken(userId: number, username: string): string {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

    if (!secret) {
      throw new Error("JWT_SECRET no está configurado");
    }

    return jwt.sign(
      { userId, username },
      secret,
      { expiresIn }
    );
  }

  async validateUser(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
      },
    });

    return user;
  }
}
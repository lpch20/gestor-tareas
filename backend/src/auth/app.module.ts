import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LoginController],
  providers: [AuthService],
})

export class LoginModule {}
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoginModule } from './auth/app.module';

@Module({
  imports: [TasksModule, PrismaModule, LoginModule],
})
export class AppModule {}


import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/middlewares/auth.middleware';
import { User } from '../auth/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @User() user: any,
  ) {
    return await this.tasksService.create(createTaskDto, user.userId);
  }

  @Get()
  async findAll(@User() user: any) {
    return  await this.tasksService.findAll(user.userId);;
    
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @User() user: any,
  ) {
    return await this.tasksService.findOne(id, user.userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @User() user: any,
  ) {
    return await this.tasksService.update(id, updateTaskDto, user.userId);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user: any,
  ) {
    return await this.tasksService.remove(id, user.userId);
  }
}


import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const data: any = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status || 'todo',
      priority: createTaskDto.priority || 'medium',
    };
    
    if (createTaskDto.dueDate) {
      data.dueDate = new Date(createTaskDto.dueDate);
    }

    return this.prisma.task.create({ data });
  }

  async findAll() {
    return this.prisma.task.findMany({
      orderBy: [
        {
          status: 'asc',
        } as any,
        {
          dueDate: 'asc',
        } as any,
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    const updateData: any = { ...updateTaskDto };
    if (updateTaskDto.dueDate) {
      updateData.dueDate = new Date(updateTaskDto.dueDate);
    } else if (updateTaskDto.dueDate === null || updateTaskDto.dueDate === '') {
      updateData.dueDate = null;
    }

    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}


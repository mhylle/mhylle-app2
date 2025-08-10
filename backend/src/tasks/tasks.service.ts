import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = this.tasksRepository.create(taskData);
    return this.tasksRepository.save(task);
  }

  async update(id: string, taskData: Partial<Task>): Promise<Task> {
    await this.tasksRepository.update(id, taskData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Task not found');
    }
  }

  async getStats(): Promise<{
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  }> {
    const [total, completed, inProgress, pending] = await Promise.all([
      this.tasksRepository.count(),
      this.tasksRepository.count({ where: { status: TaskStatus.COMPLETED } }),
      this.tasksRepository.count({ where: { status: TaskStatus.IN_PROGRESS } }),
      this.tasksRepository.count({ where: { status: TaskStatus.PENDING } }),
    ]);

    return { total, completed, inProgress, pending };
  }
}

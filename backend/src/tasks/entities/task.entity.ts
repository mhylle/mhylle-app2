import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('tasks')
export class Task {
  @ApiProperty({ description: 'Unique identifier for the task' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Task title' })
  @Column({ length: 255 })
  title: string;

  @ApiProperty({ description: 'Task description', required: false })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({ 
    description: 'Task status',
    enum: TaskStatus,
    default: TaskStatus.PENDING 
  })
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @ApiProperty({ 
    description: 'Task priority',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM 
  })
  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @ApiProperty({ description: 'Due date for the task', required: false })
  @Column('timestamptz', { nullable: true })
  dueDate: Date;

  @ApiProperty({ description: 'Task tags', required: false })
  @Column('simple-array', { nullable: true })
  tags: string[];

  @ApiProperty({ description: 'Is the task completed' })
  @Column({ default: false })
  isCompleted: boolean;

  @ApiProperty({ description: 'Task creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Task last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'Completion timestamp', required: false })
  @Column('timestamptz', { nullable: true })
  completedAt: Date;
}

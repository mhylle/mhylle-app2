import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto, MessageResponseDto } from './message.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  getHello(): string {
    return 'Hello World 2 from Backend!';
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<MessageResponseDto> {
    const message = this.messageRepository.create(createMessageDto);
    const savedMessage = await this.messageRepository.save(message);
    return savedMessage;
  }

  async getAllMessages(): Promise<MessageResponseDto[]> {
    const messages = await this.messageRepository.find({
      order: { createdAt: 'DESC' },
    });
    return messages;
  }

  async deleteMessage(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }

  getInfo() {
    return {
      application: 'App2 - Task Management System',
      version: '1.0.0',
      description: 'Backend API for App2',
      message: 'Hello World 2 from Backend!',
      features: [
        'Task Creation & Management',
        'Project Organization',
        'Collaboration Tools',
        'Reporting & Analytics'
      ],
      endpoints: {
        health: '/health',
        api: '/api/app2',
        messages: '/messages',
      },
      timestamp: new Date().toISOString()
    };
  }
}

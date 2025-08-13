import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World 2 from Backend!';
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
      },
      timestamp: new Date().toISOString()
    };
  }
}

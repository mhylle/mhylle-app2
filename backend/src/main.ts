import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for API routes to match subpath routing
  app.setGlobalPrefix('api/app2');

  // Enable CORS for the specific domain and development
  app.enableCors({
    origin: [
      'https://mhylle.com',
      'http://localhost:4200',
      'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Task Manager API - App2')
    .setDescription('API documentation for the Task Manager application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/app2/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Task Manager API (App2) is running on: http://localhost:${port}/api/app2`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/app2/docs`);
}

bootstrap();

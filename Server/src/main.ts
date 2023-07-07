import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Enable CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  await app.enableCors(corsOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //option is used to remove any extra fields that are not explicitly defined in the DTO (Data Transfer Object) being validated.
      transform: true,
      transformOptions:{
        enableImplicitConversion: true,
      }
    })
  )
  await app.use('/uploads', express.static('uploads'));
  await app.listen(3333);
}
bootstrap();

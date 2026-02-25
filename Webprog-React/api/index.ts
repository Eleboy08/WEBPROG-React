import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './src/app.module';
import * as express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );
  
  app.setGlobalPrefix('api');
  app.enableCors();
  
  await app.init();
}

bootstrap();

// This export is required for Vercel Serverless Functions
export default expressApp;
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // const reflector= new Reflector();
  // app.useGlobalGuards(new AtGuard(reflector));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {

  const app = await NestFactory.create(AppModule);


  app.use(cookieSession({
    keys: ["CARS_PLATFORM"],
  }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  await app.listen(3000, () => console.log('listening to Port 3000'));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = parseInt(process.env.PORT ?? '3000', 10);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Reviews API')
    .setDescription('Product reviews')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port, '0.0.0.0');
}

bootstrap();

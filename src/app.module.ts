import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './reviews/reviews.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'reviews',
      password: process.env.DB_PASSWORD ?? 'reviews',
      database: process.env.DB_NAME ?? 'reviews',
      autoLoadEntities: true,
      synchronize: true,
    }),
  }),
    ReviewsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

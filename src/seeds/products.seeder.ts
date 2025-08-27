import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductsSeeder implements OnApplicationBootstrap {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }
  async onApplicationBootstrap() {
    if (process.env.SEED_ON_BOOTSTRAP !== 'true') return;

    const seed = [
      { id: 'f8a8a9c5-3f6a-4a6f-9b2b-0b6c2b1d8e11', name: 'product1' },
      { id: '0df8b2c8-6b22-4a9f-8d1a-7b6d2a3c5f77', name: 'product2' },
      { id: '9ad1c3f4-2e5b-4b77-9f09-3c1a7a2b5e88', name: 'product3' },
    ];

    await this.productRepository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(seed)
      .orIgnore()
      .execute();
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Product } from '../products/entities/product.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ListReviewsDto } from './dto/list-reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const exists = await this.productRepository.exist({ where: { id: dto.productId } });
    if (!exists) {
      throw new BadRequestException('productId does not match an existing product');
    }

    const review = this.reviewRepository.create({
      productId: dto.productId,
      rating: dto.rating,
      comment: dto.comment,
    });

    return this.reviewRepository.save(review);
  }

  async list(query: ListReviewsDto): Promise<Review[]> {
    const queryBuilder = this.reviewRepository.createQueryBuilder('r');

    if (query.productId) {
      queryBuilder.andWhere('r.productId = :productId', { productId: query.productId });
    }
    if (typeof query.minRating === 'number') {
      queryBuilder.andWhere('r.rating >= :minRating', { minRating: query.minRating });
    }

    queryBuilder.orderBy('r.createdAt', 'DESC');
    return queryBuilder.getMany();
  }
}
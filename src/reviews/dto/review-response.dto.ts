import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Review } from '../entities/review.entity';

export class ReviewResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ format: 'uuid' }) productId!: string;
  @ApiProperty({ minimum: 1, maximum: 5 }) rating!: number;
  @ApiPropertyOptional({ maxLength: 200 }) comment?: string;
  @ApiProperty({ type: String, format: 'date-time' }) createdAt!: Date;

  static fromEntity(e: Review): ReviewResponseDto {
    return { id: e.id, productId: e.productId, rating: e.rating, comment: e.comment, createdAt: e.createdAt };
  }
}
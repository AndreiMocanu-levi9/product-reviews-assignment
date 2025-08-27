import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ListReviewsDto } from './dto/list-reviews.dto';
import { ReviewResponseDto } from './dto/review-response.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a review' })
  @ApiCreatedResponse({ description: 'Review created', type: ReviewResponseDto })
  @ApiBadRequestResponse({ description: 'Validation rule failed' })
  async create(@Body() dto: CreateReviewDto): Promise<ReviewResponseDto> {
    const entity = await this.reviewService.create(dto);
    return ReviewResponseDto.fromEntity(entity);
  }

  @Get()
  @ApiOperation({ summary: 'List reviews' })
  @ApiOkResponse({ description: 'List of reviews', type: [ReviewResponseDto] })
  async list(@Query() query: ListReviewsDto): Promise<ReviewResponseDto[]> {
    const items = await this.reviewService.list(query);
    return items.map(ReviewResponseDto.fromEntity);
  }
}
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiOkResponse({ type: [Product] })
  async list(): Promise<Product[]> {
    return this.productService.findAll();
  }
}

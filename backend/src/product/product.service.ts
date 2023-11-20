import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: MongoRepository<Product>
  ) { }

  async getProductsByUserId(userId: ObjectId): Promise<Array<Product>> {
    return await this.productRepository.find({ owner: new ObjectId(userId) })
  }

  async createProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async deleteProduct(productId: ObjectId): Promise<boolean> {
    const result = await this.productRepository.delete({ _id: productId });
    return result.raw.deletedCount > 0 ? true : false;
  }
}

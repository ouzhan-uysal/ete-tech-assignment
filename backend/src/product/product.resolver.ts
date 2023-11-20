import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { ObjectId } from 'mongodb';
import { IProductCreateInput, Product } from './product.entity';
import { CompanyService } from 'src/company/company.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService, private readonly companyService: CompanyService) { }

  @Query()
  @UseGuards(new AuthGuard())
  async getMyProducts(@Context('user') user: User) {
    return await this.productService.getProductsByUserId(user._id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createProduct(@Context('user') user: User, @Args('input') input: IProductCreateInput) {
    const company = await this.companyService.getCompanyById(input.companyId);
    const product = new Product();
    Object.assign(product, {
      name: input.name,
      owner: new ObjectId(user._id),
      category: input.category,
      amount: input.amount,
      unit: input.unit,
      company: company.name,
      companyId: input.companyId,
      createdAt: Date.now(),
    });
    return await this.productService.createProduct(product);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteProduct(@Args('input') input: { productId: string }): Promise<boolean> {
    return await this.productService.deleteProduct(new ObjectId(input.productId))
  }
}

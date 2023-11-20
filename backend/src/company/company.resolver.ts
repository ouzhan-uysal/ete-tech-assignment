import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { User } from 'src/user/user.entity';
import { UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Company, ICompanyCreateInput } from './company.entity';

@Resolver()
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) { }

  @Query()
  @UseGuards(new AuthGuard())
  async getMyCompanies(@Context('user') user: User) {
    return await this.companyService.getCompaniesByUserId(user._id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createCompany(@Context('user') user: User, @Args('input') input: ICompanyCreateInput) {
    const company = new Company();
    Object.assign(company, {
      name: input.name,
      owner: new ObjectId(user._id),
      legalNo: input.legalNo,
      incorporationCountry: input.incorporationCountry,
      website: input.website,
      createdAt: Date.now(),
    });
    return await this.companyService.createCompany(company);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteCompany(@Args('input') input: { companyId: string }): Promise<boolean> {
    return await this.companyService.deleteCompany(new ObjectId(input.companyId))
  }
}

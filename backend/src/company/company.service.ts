import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: MongoRepository<Company>
  ) { }

  async getCompaniesByUserId(userId: ObjectId): Promise<Array<Company>> {
    return await this.companyRepository.find({ owner: new ObjectId(userId) })
  }

  async createCompany(company: Company): Promise<Company> {
    return await this.companyRepository.save(company);
  }

  async deleteCompany(companyId: ObjectId): Promise<boolean> {
    const result = await this.companyRepository.delete({ _id: companyId });
    return result.raw.deletedCount > 0 ? true : false;
  }
}

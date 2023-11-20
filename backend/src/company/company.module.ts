import { Module } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyResolver, CompanyService],
  exports: [CompanyModule, CompanyService],
})
export class CompanyModule { }

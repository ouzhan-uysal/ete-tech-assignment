import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Company {
  @ObjectIdColumn()
  _id: ObjectId;
  @ObjectIdColumn()
  owner: ObjectId;
  @Column()
  name: string;
  @Column()
  legalNo: number;
  @Column()
  incorporationCountry: string;
  @Column()
  website: string;
  @Column()
  createdAt: number;
}

export interface ICompanyCreateInput {
  name: string;
  legalNo: number;
  incorporationCountry: string;
  website: string;
}
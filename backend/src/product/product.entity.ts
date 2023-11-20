import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;
  @ObjectIdColumn()
  owner: ObjectId;
  @Column()
  name: string;
  @Column()
  category: string;
  @Column()
  amount: number;
  @Column()
  unit: string;
  @Column()
  company: string;
  @Column()
  companyId: ObjectId;
  @Column()
  createdAt: number;
}

export interface IProductCreateInput {
  name: string;
  category: string;
  amount: number;
  unit: string;
  companyId: string;
}

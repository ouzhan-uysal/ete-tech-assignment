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
  createdAt: number;
}
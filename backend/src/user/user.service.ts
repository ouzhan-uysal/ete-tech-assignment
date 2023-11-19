import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>
  ) { }

  createAccessToken(user: User): string {
    return jwt.sign({ ...user }, process.env.SECRET_KEY);
  };

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user)
  }
}

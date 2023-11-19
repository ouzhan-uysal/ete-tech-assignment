import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query()
  @UseGuards(new AuthGuard())
  jwtCheck(@Context('user') user: User) {
    return user;
  }

  @Mutation()
  async signin(@Args('input') input: { email: string; password: string }) {
    const user = await this.userService.getUserByEmail(input.email);
    if (!user) {
      throw new BadRequestException('Invalid E-mail');
    }
    if (!(await bcrypt.compare(input.password, user.password))) {
      throw new BadRequestException('Invalid Credentials!');
    }
    return { access_token: this.userService.createAccessToken(user) };
  };

  @Mutation()
  async signup(@Args('input') input: { username: string; email: string; password: string }) {
    const user = new User();
    const hashedPassword = await bcrypt.hash(input.password, 12);
    Object.assign(user, {
      username: input.username,
      email: input.email,
      password: hashedPassword,
    });
    return await this.userService.createUser(user);
  }
}

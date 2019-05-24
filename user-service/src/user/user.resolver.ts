import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/graphql.schema';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  async user(@Args('username') username: string): Promise<User> {
    return await this.userService.findOneByUsername(username);
  }

  @Mutation('createUser')
  async create(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('email') email: string,
  ) {
    return await this.userService.create(username, password, email);
  }
}

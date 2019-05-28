import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../graphql.schema';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  async user(@Args('userid') userid: string): Promise<User> {
    return await this.userService.findOneByUsername(userid);
  }

  @Mutation('createUser')
  async create(
    @Args('userid') userid: string,
    @Args('password') password: string,
    @Args('email') email: string,
  ) {
    return await this.userService.create(userid, password, email);
  }
}

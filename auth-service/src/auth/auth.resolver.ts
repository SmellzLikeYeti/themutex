import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('authenticate')
  async user(
    @Args('userid') userid: string,
    @Args('password') password: string,
  ): Promise<boolean> {
    return await this.authService.authenticate(userid, password);
  }

  @Mutation('createAuthentication')
  async createAuthentication(
    @Args('userid') userid: string,
    @Args('hash') hash: string,
  ): Promise<boolean> {
    return await this.authService.createAuthentication(userid, hash);
  }

  @Mutation('updateAuthentication')
  async updateAuthentication(
    @Args('userid') userid: string,
    @Args('password') password: string,
  ): Promise<boolean> {
    return await this.authService.updateAuthentication(userid, password);
  }
}

import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('authenticate')
  async user(
    @Args('password') password: string,
    @Args('hash') hash: string,
  ): Promise<boolean> {
    return await this.authService.authenticate(password, hash);
  }
}

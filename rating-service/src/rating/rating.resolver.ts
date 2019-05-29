import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { Rating } from 'src/graphql.schema';

@Resolver('Rating')
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Query('rating')
  async rating(@Args('userid') userid: string): Promise<Rating> {
    return await this.ratingService.getRating(userid);
  }

  @Mutation('calculateRating')
  async calculateRating(
    @Args('userid') userid: string,
    @Args('ratingTransmutation') ratingTransmutation: number,
  ): Promise<boolean> {
    return await this.ratingService.updateRating(userid, ratingTransmutation);
  }
}

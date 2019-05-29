import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RatingModule } from './rating/rating.module';
@Module({
  imports: [
    RatingModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}

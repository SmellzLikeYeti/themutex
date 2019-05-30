import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [
    CommentModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}

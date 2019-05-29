import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TopicModule } from './topic/topic.module';
@Module({
  imports: [
    TopicModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}

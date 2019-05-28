import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProfileModule } from './profile/profile.module';
@Module({
  imports: [
    ProfileModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}

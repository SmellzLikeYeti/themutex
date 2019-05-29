import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TopicService } from './topic.service';
import { Topic } from '../graphql.schema';

@Resolver('Profile')
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Query('topic')
  async topic(@Args('topicid') topicid: string): Promise<Topic> {
    return await this.topicService.getTopic(topicid);
  }

  @Query('allTopics')
  async allTopics(): Promise<Topic[]> {
    return await this.topicService.getAllTopics();
  }
}

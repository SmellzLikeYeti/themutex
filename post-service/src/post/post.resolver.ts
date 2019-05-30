import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from 'src/graphql.schema';

@Resolver('Post')
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query('post')
  async post(@Args('postid') postid: string): Promise<Post> {
    return await this.postService.getPost(postid);
  }

  @Query('userPosts')
  async userPosts(@Args('userid') userid: string): Promise<Post[]> {
    return await this.postService.getUserPosts(userid);
  }

  @Query('topicPosts')
  async topicPosts(@Args('topicid') topicid: string): Promise<Post[]> {
    return await this.postService.getTopicPosts(topicid);
  }

  @Mutation('createPost')
  async createPost(
    @Args('topicid') topicid: string,
    @Args('content') content: string,
    @Args('userid') userid: string,
  ): Promise<boolean> {
    return await this.postService.createPost(topicid, content, userid);
  }

  @Mutation('editPost')
  async editPost(
    @Args('postid') postid: string,
    @Args('topicid') topicid: string,
    @Args('userid') userid: string,
    @Args('content') content: string,
  ): Promise<boolean> {
    return await this.postService.editPost(postid, topicid, userid, content);
  }

  @Mutation('deletePost')
  async deletePost(
    @Args('postid') postid: string,
    @Args('topicid') topicid: string,
    @Args('userid') userid: string,
  ): Promise<boolean> {
    return await this.postService.deletePost(postid, topicid, userid);
  }
}

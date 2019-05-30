import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from '../graphql.schema';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query('getPostComments')
  async getPostComments(@Args('postid') postid: string): Promise<Comment[]> {
    return await this.commentService.getPostComments(postid);
  }

  @Query('getUserComments')
  async getUserComments(@Args('userid') userid: string): Promise<Comment[]> {
    return await this.commentService.getUserComments(userid);
  }

  @Mutation('createComment')
  async createComment(
    @Args('postid') postid: string,
    @Args('userid') userid: string,
    @Args('content') content: string,
  ): Promise<boolean> {
    return await this.commentService.createComment(postid, userid, content);
  }

  @Mutation('editComment')
  async editComment(
    @Args('commentid') commentid: string,
    @Args('userid') userid: string,
    @Args('content') content: string,
  ): Promise<boolean> {
    return await this.commentService.editComment(commentid, userid, content);
  }

  @Mutation('deleteComment')
  async deleteComment(
    @Args('commentid') commentid: string,
    @Args('userid') userid: string,
  ): Promise<boolean> {
    return await this.commentService.deleteComment(commentid, userid);
  }
}

import { CommentService } from './comment.service';
import { Comment } from '../graphql.schema';
export declare class CommentResolver {
    private readonly commentService;
    constructor(commentService: CommentService);
    getPostComments(postid: string): Promise<Comment[]>;
    getUserComments(userid: string): Promise<Comment[]>;
    createComment(postid: string, userid: string, content: string): Promise<boolean>;
    editComment(commentid: string, userid: string, content: string): Promise<boolean>;
    deleteComment(commentid: string, userid: string): Promise<boolean>;
}

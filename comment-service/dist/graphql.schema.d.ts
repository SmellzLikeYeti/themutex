export declare class Comment {
    commentid: string;
    postid: string;
    userid: string;
    content: string;
    createdWhen: string;
}
export declare abstract class IMutation {
    abstract createComment(postid: string, userid: string, content: string): boolean | Promise<boolean>;
    abstract editComment(commentid: string, userid: string, content: string): boolean | Promise<boolean>;
    abstract deleteComment(commentid: string, userid: string): boolean | Promise<boolean>;
}
export declare abstract class IQuery {
    abstract getPostComments(postid: string): Comment[] | Promise<Comment[]>;
    abstract getUserComments(userid: string): Comment[] | Promise<Comment[]>;
}

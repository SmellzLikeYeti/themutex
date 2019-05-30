
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Comment {
    commentid: string;
    postid: string;
    userid: string;
    content: string;
    createdWhen: string;
}

export abstract class IMutation {
    abstract createComment(postid: string, userid: string, content: string): boolean | Promise<boolean>;

    abstract editComment(commentid: string, userid: string, content: string): boolean | Promise<boolean>;

    abstract deleteComment(commentid: string, userid: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract getPostComments(postid: string): Comment[] | Promise<Comment[]>;

    abstract getUserComments(userid: string): Comment[] | Promise<Comment[]>;
}

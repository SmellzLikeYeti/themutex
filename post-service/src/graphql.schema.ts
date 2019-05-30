
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export abstract class IMutation {
    abstract createPost(topicid: string, content: string, userid: string): boolean | Promise<boolean>;

    abstract editPost(postid: string, topicid: string, content: string): boolean | Promise<boolean>;

    abstract deletePost(postid: string, topicid: string): boolean | Promise<boolean>;
}

export class Post {
    postid: string;
    topicid: string;
    content: string;
    userid: string;
    createdWhen: string;
}

export abstract class IQuery {
    abstract post(postid: string): Post | Promise<Post>;

    abstract userPosts(userid: string): Post[] | Promise<Post[]>;

    abstract topicPosts(topicid: string): Post[] | Promise<Post[]>;
}

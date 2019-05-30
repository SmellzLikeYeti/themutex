import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Comment } from '../graphql.schema';

@Injectable()
export class CommentService {
  private docClient: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  }

  getPostComments(postid: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'comment',
        IndexName: 'postid-index',
        KeyConditionExpression: 'postid = :postid',
        ExpressionAttributeValues: {
          ':postid': postid,
        },
      };
      const postComments: Comment[] = [];
      this.docClient.query(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          data.Items.forEach(comment => {
            postComments.push({
              commentid: comment.commentid,
              postid: comment.postid,
              userid: comment.userid,
              content: comment.content,
              createdWhen: comment.createdWhen,
            });
          });
          resolve(postComments);
        }
      });
    });
  }

  getUserComments(userid: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'comment',
        IndexName: 'userid-index',
        KeyConditionExpression: 'userid = :userid',
        ExpressionAttributeValues: {
          ':userid': userid,
        },
      };
      const userComments: Comment[] = [];
      this.docClient.query(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          data.Items.forEach(comment => {
            userComments.push({
              commentid: comment.commentid,
              postid: comment.postid,
              userid: comment.userid,
              content: comment.content,
              createdWhen: comment.createdWhen,
            });
          });
          resolve(userComments);
        }
      });
    });
  }

  createComment(
    postid: string,
    userid: string,
    content: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getPostComments(postid)
        .then(postComments => {
          const count = postComments.length;
          const commentid = `${postid}${count + 1}`;
          const createdWhen = new Date().toString();
          const params = {
            TableName: 'comment',
            Item: {
              commentid,
              postid,
              userid,
              content,
              createdWhen,
            },
            ConditionExpression: 'attribute_not_exists(commentid)',
          };

          this.docClient.put(params, (err, data) => {
            if (err) {
              reject(false);
            } else {
              resolve(true);
            }
          });
        })
        .catch(e => {
          reject(false);
        });
    });
  }

  editComment(
    commentid: string,
    userid: string,
    content: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'comment',
        Key: {
          commentid,
          userid,
        },
        UpdateExpression: 'set content = :content',
        ExpressionAttributeValues: {
          ':content': content,
        },
      };

      this.docClient.update(params, (err, data) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  deleteComment(commentid: string, userid: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'comment',
        Key: {
          commentid,
          userid,
        },
        ConditionExpression: 'commentid = :commentid',
        ExpressionAttributeValues: {
          ':commentid': commentid,
        },
      };

      this.docClient.delete(params, (err, data) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}

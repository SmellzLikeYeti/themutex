import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Post } from 'src/graphql.schema';

@Injectable()
export class PostService {
  private docClient: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  }

  getPost(postid: string): Promise<Post> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'post',
        Key: {
          postid,
        },
      };

      this.docClient.get(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            postid: data.Item.postid,
            topicid: data.Item.topicid,
            content: data.Item.content,
            userid: data.Item.userid,
            createdWhen: data.Item.createdWhen,
          });
        }
      });
    });
  }

  getUserPosts(userid: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'post',
        IndexName: 'userid-index',
        KeyConditionExpression: 'userid = :userid',
        ExpressionAttributeValues: {
          ':userid': userid,
        },
      };
      const userPosts: Post[] = [];
      this.docClient.query(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          data.Items.forEach(post => {
            userPosts.push({
              postid: post.postid,
              topicid: post.topicid,
              content: post.content,
              userid: post.userid,
              createdWhen: post.createdWhen,
            });
          });
          resolve(userPosts);
        }
      });
    });
  }

  getTopicPosts(topicid: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'post',
        IndexName: 'topicid-index',
        KeyConditionExpression: 'topicid = :topicid',
        ExpressionAttributeValues: {
          ':topicid': topicid,
        },
      };
      const topicPosts: Post[] = [];
      this.docClient.query(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          data.Items.forEach(post => {
            topicPosts.push({
              postid: post.postid,
              topicid: post.topicid,
              content: post.content,
              userid: post.userid,
              createdWhen: post.createdWhen,
            });
          });
          resolve(topicPosts);
        }
      });
    });
  }

  createPost(
    topicid: string,
    content: string,
    userid: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Calculate the postid,
      this.getTopicPosts(topicid)
        .then(topicPosts => {
          const count = topicPosts.length;
          const postid = `${topicid}${count + 1}`;
          const createdWhen = new Date().toString();
          const params = {
            TableName: 'post',
            Item: {
              postid,
              topicid,
              content,
              userid,
              createdWhen,
            },
            ConditionExpression: 'attribute_not_exists(postid)',
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

  editPost(postid: string, topicid: string, content: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'post',
        Key: {
          postid,
          topicid,
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

  deletePost(postid: string, topicid: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'post',
        Key: {
          postid,
          topicid,
        },
        ConditionExpression: 'postid = :postid',
        ExpressionAttributeValues: {
          ':postid': postid,
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

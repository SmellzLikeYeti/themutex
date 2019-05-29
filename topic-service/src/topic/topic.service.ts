import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Topic } from '../graphql.schema';

@Injectable()
export class TopicService {
  private docClient: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  }

  getTopic(topicid: string): Promise<Topic> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'topic',
        Key: {
          topicid,
        },
      };

      this.docClient.get(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            topicid: data.Item.topicid,
            name: data.Item.name,
          });
        }
      });
    });
  }

  getAllTopics(): Promise<Topic[]> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'topic',
      };
      const topics: Topic[] = [];
      this.docClient.scan(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          data.Items.forEach(item => {
            topics.push({
              topicid: item.topicid,
              name: item.name,
            });
          });
          resolve(topics);
        }
      });
    });
  }
}

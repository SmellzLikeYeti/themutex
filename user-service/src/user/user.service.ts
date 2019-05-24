import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as bcrypt from 'bcrypt';
import { User } from 'src/graphql.schema';

@Injectable()
export class UserService {
  private docClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  }

  findOneByUsername(username: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'users',
        Key: {
          username,
        },
      };

      this.docClient.get(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            username: data.Item.username,
            password: data.Item.password,
            email: data.Item.email,
          });
        }
      });
    });
  }

  create(username: string, password: string, email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // Hash the password so we aren't being dumb
      this.hashPassword(password).then(hashedPassword => {
        const params = {
          TableName: 'users',
          Item: {
            username,
            password: hashedPassword,
            email,
          },
          ConditionExpression: 'attribute_not_exists(username)',
        };

        this.docClient.put(params, (err, data) => {
          if (err) {
            reject(undefined);
          } else {
            resolve();
          }
        });
      });
    });
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }
}

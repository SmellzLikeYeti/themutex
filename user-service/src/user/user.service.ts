import { Injectable, HttpService } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { User } from '../graphql.schema';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private docClient: AWS.DynamoDB.DocumentClient;

  constructor(private http: HttpService) {
    this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  }

  findOneByUsername(userid: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'user',
        Key: {
          userid,
        },
      };

      this.docClient.get(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            userid: data.Item.userid,
            email: data.Item.email,
          });
        }
      });
    });
  }

  create(userid: string, password: string, email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Hash the password so we aren't being dumb
      this.handleUserAuthentication(userid, password)
        .then(() => {
          // Store the non sensitive user data
          const params = {
            TableName: 'user',
            Item: {
              userid,
              email,
            },
            ConditionExpression: 'attribute_not_exists(userid)',
          };

          this.docClient.put(params, (err, data) => {
            if (err) {
              reject(false);
            } else {
              resolve(true);
            }
          });
        })
        .catch(err => {
          reject(false);
        });
    });
  }

  // Update to send to the auth-service for storage
  private handleUserAuthentication(
    userid: string,
    password: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const lambda = new AWS.Lambda({ region: 'us-east-1' });
      // Hash the raw password before we invoke the auth function to save it
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          this.http
            .post(
              'https://6ouckl5see.execute-api.us-east-1.amazonaws.com/dev/graphql',
              {
                query: `mutation {createAuthentication(userid: \"${userid}\", hash: \"${hash}\")}`,
              },
            )
            .subscribe(
              res => {
                resolve(res.data);
              },
              e => {
                reject(e);
              },
            );
        }
      });
    });
  }
}

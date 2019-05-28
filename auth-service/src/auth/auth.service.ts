import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private docClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  }

  authenticate(userid: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Query the auth table to get the user's hash
      this.getHash(userid).then(pwHash => {
        // Either user doesnt exist or something else
        if (pwHash === undefined) {
          reject(false);
        }
        bcrypt.compare(password, pwHash, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    });
  }

  createAuthentication(userid: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'auth',
        Item: {
          userid,
          hash,
        },
      };

      this.docClient.put(params, (err, data) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  updateAuthentication(userid: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // TODO update dynamo auth table with new password for user
    });
  }

  private getHash(userid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'auth',
        Key: {
          userid,
        },
      };

      this.docClient.get(params, (err, data) => {
        if (err) {
          reject(undefined);
        } else {
          resolve(data.Item.hash);
        }
      });
    });
  }
}

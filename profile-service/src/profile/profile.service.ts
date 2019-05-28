import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Profile } from 'src/graphql.schema';

@Injectable()
export class ProfileService {
  private docClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  }

  fetchProfile(userid: string): Promise<Profile> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'profile',
        Key: {
          userid,
        },
      };

      this.docClient.get(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            fname: data.Item.fname,
            lname: data.Item.lname,
            occupation: data.Item.occupation,
            company: data.Item.company,
          });
        }
      });
    });
  }

  createProfile(
    userid: string,
    fname: string,
    lname: string,
    occupation: string,
    company: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'profile',
        Item: {
          userid,
          fname,
          lname,
          occupation,
          company,
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
    });
  }

  updateFirstName(userid: string, fname: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'profile',
        Key: {
          userid,
        },
        UpdateExpression: 'set fname = :fname',
        ExpressionAttributeValues: {
          ':fname': fname,
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

  updateLastName(userid: string, lname: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'profile',
        Key: {
          userid,
        },
        UpdateExpression: 'set lname = :lname',
        ExpressionAttributeValues: {
          ':lname': lname,
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

  updateOccupation(userid: string, occupation: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'profile',
        Key: {
          userid,
        },
        UpdateExpression: 'set occupation = :occupation',
        ExpressionAttributeValues: {
          ':occupation': occupation,
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

  updateCompany(userid: string, company: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'profile',
        Key: {
          userid,
        },
        UpdateExpression: 'set company = :company',
        ExpressionAttributeValues: {
          ':company': company,
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
}

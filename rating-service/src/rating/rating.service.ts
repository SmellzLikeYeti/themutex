import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Rating } from 'src/graphql.schema';

@Injectable()
export class RatingService {
  private docClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  }

  getRating(userid: string): Promise<Rating> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'rating',
        Key: {
          userid,
        },
      };

      this.docClient.get(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            rating: data.Item.rating,
          });
        }
      });
    });
  }

  updateRating(userid: string, ratingTransmutation: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getUserRatingSet(userid)
        .then(userRatingSet => {
          // Add a new entry in the rating array -1 for indexing
          userRatingSet[ratingTransmutation - 1]++;
          this.calculateRating(userRatingSet)
            .then(newRating => {
              const params = {
                TableName: 'rating',
                Key: {
                  userid,
                },
                UpdateExpression:
                  'set rating = :rating, ratingSet = :ratingSet',
                ExpressionAttributeValues: {
                  ':rating': newRating,
                  ':ratingSet': userRatingSet,
                },
              };
              this.docClient.update(params, (err, data) => {
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
        })
        .catch(e => {
          reject(false);
        });
    });
  }

  private calculateRating(ratingSet: number[]): Promise<number> {
    return new Promise((resolve, reject) => {
      let runningTotal = 0;
      for (let i = 0; i < ratingSet.length; i++) {
        runningTotal += ratingSet[i] * (i + 1);
      }
      const rating =
        runningTotal /
        (ratingSet[0] +
          ratingSet[1] +
          ratingSet[2] +
          ratingSet[3] +
          ratingSet[4]);

      resolve(Math.round(rating * 100) / 100);
    });
  }

  private getUserRatingSet(userid: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'rating',
        Key: {
          userid,
        },
      };
      this.docClient.get(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const ratingSet: number[] = data.Item.ratingSet;
          resolve(ratingSet);
        }
      });
    });
  }
}

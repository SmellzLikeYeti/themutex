"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const AWS = __importStar(require("aws-sdk"));
let ProfileService = class ProfileService {
    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
    }
    fetchProfile(userid) {
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
                }
                else {
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
    createProfile(userid, fname, lname, occupation, company) {
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
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateFirstName(userid, fname) {
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
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateLastName(userid, lname) {
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
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateOccupation(userid, occupation) {
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
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateCompany(userid, company) {
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
                }
                else {
                    resolve(true);
                }
            });
        });
    }
};
ProfileService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map
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
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
    }
    findOneByUsername(username) {
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
                }
                else {
                    resolve({
                        username: data.Item.username,
                        password: data.Item.password,
                        email: data.Item.email,
                    });
                }
            });
        });
    }
    create(username, password, email) {
        return new Promise((resolve, reject) => {
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
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
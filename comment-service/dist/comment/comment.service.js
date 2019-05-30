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
let CommentService = class CommentService {
    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
    }
    getPostComments(postid) {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: 'comment',
                IndexName: 'postid-index',
                KeyConditionExpression: 'postid = :postid',
                ExpressionAttributeValues: {
                    ':postid': postid,
                },
            };
            const postComments = [];
            this.docClient.query(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
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
    getUserComments(userid) {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: 'comment',
                IndexName: 'userid-index',
                KeyConditionExpression: 'userid = :userid',
                ExpressionAttributeValues: {
                    ':userid': userid,
                },
            };
            const userComments = [];
            this.docClient.query(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
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
    createComment(postid, userid, content) {
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
                    }
                    else {
                        resolve(true);
                    }
                });
            })
                .catch(e => {
                reject(false);
            });
        });
    }
    editComment(commentid, userid, content) {
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
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    deleteComment(commentid, userid) {
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
                }
                else {
                    resolve(true);
                }
            });
        });
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map
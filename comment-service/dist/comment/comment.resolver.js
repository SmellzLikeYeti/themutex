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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const comment_service_1 = require("./comment.service");
let CommentResolver = class CommentResolver {
    constructor(commentService) {
        this.commentService = commentService;
    }
    getPostComments(postid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.getPostComments(postid);
        });
    }
    getUserComments(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.getUserComments(userid);
        });
    }
    createComment(postid, userid, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.createComment(postid, userid, content);
        });
    }
    editComment(commentid, userid, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.editComment(commentid, userid, content);
        });
    }
    deleteComment(commentid, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.deleteComment(commentid, userid);
        });
    }
};
__decorate([
    graphql_1.Query('getPostComments'),
    __param(0, graphql_1.Args('postid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getPostComments", null);
__decorate([
    graphql_1.Query('getUserComments'),
    __param(0, graphql_1.Args('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getUserComments", null);
__decorate([
    graphql_1.Mutation('createComment'),
    __param(0, graphql_1.Args('postid')),
    __param(1, graphql_1.Args('userid')),
    __param(2, graphql_1.Args('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createComment", null);
__decorate([
    graphql_1.Mutation('editComment'),
    __param(0, graphql_1.Args('commentid')),
    __param(1, graphql_1.Args('userid')),
    __param(2, graphql_1.Args('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "editComment", null);
__decorate([
    graphql_1.Mutation('deleteComment'),
    __param(0, graphql_1.Args('commentid')),
    __param(1, graphql_1.Args('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "deleteComment", null);
CommentResolver = __decorate([
    graphql_1.Resolver('Comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentResolver);
exports.CommentResolver = CommentResolver;
//# sourceMappingURL=comment.resolver.js.map
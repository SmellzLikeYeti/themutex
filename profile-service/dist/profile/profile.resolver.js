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
const profile_service_1 = require("./profile.service");
let ProfileResolver = class ProfileResolver {
    constructor(profileService) {
        this.profileService = profileService;
    }
    profile(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileService.fetchProfile(userid);
        });
    }
    create(userid, fname, lname, occupation, company) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileService.createProfile(userid, fname, lname, occupation, company);
        });
    }
    updateFName(userid, fname) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileService.updateFirstName(userid, fname);
        });
    }
    updateLName(userid, lname) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileService.updateLastName(userid, lname);
        });
    }
    updateOccupation(userid, occupation) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileService.updateOccupation(userid, occupation);
        });
    }
    updateCompany(userid, company) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profileService.updateCompany(userid, company);
        });
    }
};
__decorate([
    graphql_1.Query('profile'),
    __param(0, graphql_1.Args('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "profile", null);
__decorate([
    graphql_1.Mutation('createProfile'),
    __param(0, graphql_1.Args('userid')),
    __param(1, graphql_1.Args('fname')),
    __param(2, graphql_1.Args('lname')),
    __param(3, graphql_1.Args('occupation')),
    __param(4, graphql_1.Args('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "create", null);
__decorate([
    graphql_1.Mutation('updateFName'),
    __param(0, graphql_1.Args('userid')),
    __param(1, graphql_1.Args('fname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "updateFName", null);
__decorate([
    graphql_1.Mutation('updateLName'),
    __param(0, graphql_1.Args('userid')),
    __param(1, graphql_1.Args('lname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "updateLName", null);
__decorate([
    graphql_1.Mutation('updateOccupation'),
    __param(0, graphql_1.Args('userid')),
    __param(1, graphql_1.Args('occupation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "updateOccupation", null);
__decorate([
    graphql_1.Mutation('updateCompany'),
    __param(0, graphql_1.Args('userid')),
    __param(1, graphql_1.Args('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "updateCompany", null);
ProfileResolver = __decorate([
    graphql_1.Resolver('Profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileResolver);
exports.ProfileResolver = ProfileResolver;
//# sourceMappingURL=profile.resolver.js.map
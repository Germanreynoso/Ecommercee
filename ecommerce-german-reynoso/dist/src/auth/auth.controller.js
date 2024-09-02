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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signin_auth_dto_1 = require("./dto/signin-auth.dto");
const signup_auth_dto_1 = require("./dto/signup-auth.dto");
const response_user_dto_1 = require("../users/dto/response-user.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(credentials) {
        return this.authService.signIn(credentials);
    }
    async signUp(signUpUser, request) {
        const user = await this.authService.signUp(signUpUser);
        return new response_user_dto_1.userResponseDTO(user);
    }
    getAuth0Protected(request) {
        console.log(JSON.stringify(request.oidc));
        console.log(JSON.stringify(request.oidc.idToken));
        return JSON.stringify(request.oidc.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in a user' }),
    (0, swagger_1.ApiBody)({ type: signin_auth_dto_1.SignInAuthDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully signed in.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_auth_dto_1.SignInAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Sign up a new user' }),
    (0, swagger_1.ApiBody)({ type: signup_auth_dto_1.SignUpAuthDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully signed up.', type: response_user_dto_1.userResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    openapi.ApiResponse({ status: 201, type: require("../users/dto/response-user.dto").userResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_auth_dto_1.SignUpAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('auth0/protected'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Auth0 protected user information' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Protected user information retrieved.' }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAuth0Protected", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth0Config = void 0;
const dotenv = require("dotenv");
dotenv.config({
    path: ".env",
});
exports.auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
//# sourceMappingURL=auth0.config.js.map
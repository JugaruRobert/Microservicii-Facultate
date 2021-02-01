"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_name = exports.db_host = exports.user_host = exports.auth_host = void 0;
exports.auth_host = process.env.ORDER_HOST || 'auth';
exports.user_host = process.env.User_Host || 'user';
exports.db_host = process.env.DB_HOST || 'localhost:27017';
exports.db_name = process.env.DB_NAME || 'youbrary';
//# sourceMappingURL=config.js.map
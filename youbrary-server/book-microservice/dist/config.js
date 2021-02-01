"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book_host = exports.db_name = exports.db_host = void 0;
exports.db_host = process.env.DB_HOST || 'localhost:27017';
exports.db_name = process.env.DB_NAME || 'youbrary';
exports.book_host = process.env.BOOK_HOST || 'book';
//# sourceMappingURL=config.js.map
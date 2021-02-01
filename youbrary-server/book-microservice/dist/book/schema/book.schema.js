"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const mongoose = require("mongoose");
exports.BookSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String,
    description: String,
    isbn: String,
    publisher: String,
    numberOfPages: Number,
    coverImage: String
});
//# sourceMappingURL=book.schema.js.map
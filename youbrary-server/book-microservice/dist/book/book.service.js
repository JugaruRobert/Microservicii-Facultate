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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BookService = class BookService {
    constructor(model) {
        this.model = model;
        this.logger = new common_1.Logger('Book Service');
    }
    async getAllBooksByUserEmail(email) {
        return await this.model.find(book => book.userEmail === email);
    }
    async getBookByID(bookID) {
        return await this.model.findById(bookID);
    }
    async saveBook(book) {
        const bookModel = new this.model(book);
        return await bookModel.save();
    }
    async deleteBook(bookID) {
        const book = await this.getBookByID(bookID);
        if (book)
            await this.model.deleteOne(bookID);
    }
};
BookService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Book')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map
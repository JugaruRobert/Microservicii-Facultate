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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class Book extends mongoose_1.Document {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Book.prototype, "isbn", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Book.prototype, "publisher", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], Book.prototype, "numberOfPages", void 0);
__decorate([
    class_validator_1.IsBase64(),
    __metadata("design:type", String)
], Book.prototype, "coverImage", void 0);
exports.Book = Book;
//# sourceMappingURL=book.js.map
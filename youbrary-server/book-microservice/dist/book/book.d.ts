import { Document } from 'mongoose';
export declare class Book extends Document {
    id: string;
    title: string;
    author: string;
    description: string;
    isbn: string;
    publisher: string;
    numberOfPages: number;
    coverImage: string;
}

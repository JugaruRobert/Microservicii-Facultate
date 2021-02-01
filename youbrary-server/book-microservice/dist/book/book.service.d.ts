import { Model } from 'mongoose';
import { Book } from './book';
export declare class BookService {
    private readonly model;
    private readonly logger;
    constructor(model: Model<Book>);
    getAllBooksByUserEmail(email: string): Promise<Book[]>;
    getBookByID(bookID: string): Promise<Book>;
    saveBook(book: Book): Promise<Book>;
    deleteBook(bookID: string): Promise<void>;
}

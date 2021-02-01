import { Book } from "./book";
import { BookService } from "./book.service";
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    getAllBooksByUserEmail(email: string): Promise<Book[]>;
    getByID(bookID: string): Promise<Book>;
    addBook(book: Book): Promise<Book>;
    update(book: Book): Promise<Book>;
    deleteBook(bookID: string): Promise<void>;
}

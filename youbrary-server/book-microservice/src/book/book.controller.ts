import { Body, Controller, Delete, Get, GoneException, Logger, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";

import { v4 as uuidv4 } from 'uuid';

import { Book } from "./book";
import { BookService } from "./book.service";

@Controller('books')
@ApiTags('books')
export class BookController {
    private readonly logger = new Logger("Book Controller");

    constructor(private readonly bookService: BookService) {}

    @MessagePattern('getAllBooksByEmail')
    @Get(':email')
    @ApiOperation({ summary: 'Get all books by user email' })
    @ApiParam({ name: 'email', required: true, description: 'User Email' })
    @ApiResponse({ status: 200, description: 'An array of books', type: Book, isArray: true })
    async getAllBooksByUserEmail(@Param('email') email: string): Promise<Book[]> {
        this.logger.log("getAllBooksByUserEmail method called - email: " + email);

        const books = await this.bookService.getAllBooksByUserEmail(email);

        this.logger.log("Result length: " + books.length);

        return books;
    }

    @MessagePattern('getBookByID')
    @Get('/bookID/:bookID')
    @ApiOperation({ summary: 'Get a book by ID' })
    @ApiParam({ name: 'bookID', required: true, description: 'The id of the book' })
    @ApiResponse({ status: 200, description: 'A book', type: Book })
    async getByID(@Param('bookID') bookID: string): Promise<Book> {
        this.logger.log("getByID method called - bookID: " + bookID);

        const book = await this.bookService.getBookByID(bookID);

        if (!book) { 
            this.logger.log("Book not found!");
            throw new NotFoundException("Book not found");   
        }

        return book;
    }

    @MessagePattern('addBook')
    @Post()
    @ApiOperation({ summary: 'Add a new book' })
    @ApiBody({type: [Book]})
    @ApiResponse({ status: 200, description: 'The newly created book', type: Book })
    async addBook(@Body() book: Book): Promise<Book> {
        this.logger.log("addBook method called - bookID: " + book.id);

        if(!book.id)
            book.id = uuidv4();
            
        const savedBook = await this.bookService.saveBook(book);

        this.logger.log("Book saved");

        return savedBook;
    }

    @MessagePattern('updateBook')
    @Put()
    @ApiOperation({ summary: 'Update a book' })
    @ApiBody({type: [Book]})
    @ApiResponse({ status: 200, description: 'The updated book', type: Book })
    async update(@Body() book: Book): Promise<Book> {
        this.logger.log("update method called - bookID: " + book.id);

        const databaseBook = await this.bookService.getBookByID(book.id);

        if (!databaseBook) {
            this.logger.log("Book not found!");
            throw new GoneException();
        }

        const updatedBook = await this.bookService.updateBook(book);

        this.logger.log("Book updated");

        return updatedBook;
    }

    @Delete('clear')
    @ApiOperation({ summary: 'Clear book collection' })
    async clearCollection(): Promise<void> {
        this.logger.log("clearCollection method called");

        await this.bookService.clearCollection();
    }

    @EventPattern('deleteBook')
    @Delete(':bookID')
    @ApiOperation({ summary: 'Delete a book by id' })
    @ApiParam({ name: 'bookID', required: true, description: 'The id of the book' })
    async deleteBook(@Param('bookID') bookID: string): Promise<void> {
        this.logger.log("deleteBook method called - bookID: " + bookID);

        const book = await this.bookService.getBookByID(bookID);

        if (!book) {
            this.logger.log("Book not found!");
            throw new GoneException();
        }
        
        await this.bookService.deleteBook(bookID);

        this.logger.log("Book deleted!");
    }
}
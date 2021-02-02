import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book } from './book';

@Injectable()
export class BookService {
  private readonly logger = new Logger('Book Service');

  constructor(@InjectModel('Book') private readonly model: Model<Book>) {}

  async getAllBooksByUserEmail(email: string): Promise<Book[]> {
    return await this.model.find({userEmail: email});
  }

  async getBookByID(bookID: string): Promise<Book> {
    return await this.model.findOne({id: bookID});
  }

  async saveBook(book: Book): Promise<Book> {
    const bookModel = new this.model(book);
    return await bookModel.save();
  }

  async updateBook(book: Book): Promise<Book> {
    return await this.model.findOneAndUpdate({id: book.id}, {
      title: book.title,
      author: book.author,
      description: book.description,
      isbn: book.isbn,
      publisher: book.publisher,
      numberOfPages: book.numberOfPages,
      coverImage: book.coverImage
    }, 
    {upsert: false, new: true});
  }

  async clearCollection() {
    await this.model.remove({});
  }

  async deleteBook(bookID: string) {
    const book = await this.getBookByID(bookID);

    if(book)
      await this.model.deleteOne({id: bookID});
  }
}
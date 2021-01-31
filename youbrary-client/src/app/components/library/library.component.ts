import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from 'src/app/shared/models/books';
import { Book } from 'src/app/shared/models/shared.models';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  books: Book[] = [];
  numberOfPages: number = 0;
  booksPerPage = 9;
  selectedPageNumber = -1;
  userEmail: string = "";

  constructor(private apiService: ApiService,
              private loginService: LoginService,
              private route: Router) { }

  ngOnInit(): void {
    this.userEmail = this.loginService.getLoggedInUser().email;
    this.getBooks();
  }

  redirectToBookDetails(bookID: string) {
    this.route.navigate(['details', bookID]);
  }

  redirectToAddBook() {
    location.href = '/details/add';
  }

  private getBooks() {
    this.apiService.getAllBooks(this.userEmail).subscribe((books: Book[]) => {
      this.books = books;

      if(!this.books || this.books.length === 0) 
        this.addMockBooks();
    });
  }

  private addMockBooks() {
    this.books = Books;
    this.books.forEach((book) => {
      book.userEmail = this.userEmail;
      this.apiService.addBook(book).subscribe((_) => console.log("bookAdded"));
    });
  }
}
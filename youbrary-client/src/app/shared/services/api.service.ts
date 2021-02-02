import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { AccessToken, Book, ErrorResponse, LoginInfo } from '../models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected baseUrl: string;

  constructor(private http: HttpClient) {}

  login(loginInfo: LoginInfo): Observable<AccessToken> {
    return this.http.post<AccessToken>(environment.authURL + "login", loginInfo);
  }

  register(loginInfo: LoginInfo): Observable<ErrorResponse> {
    return this.http.post<ErrorResponse>(environment.authURL + "register", loginInfo);
  }

  getAllBooks(userEmail: string): Observable<Book[]> {
    return this.http.get<Book[]>(environment.bookURL + userEmail);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(environment.bookURL, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(environment.bookURL, book);
  }

  googleLogin() {
    location.href = environment.authURL + 'google';
  }

  getBookDetails(bookID: string): Observable<Book> {
    return this.http.get<Book>(environment.bookURL + 'bookID/' + bookID);
  }

  deleteBook(bookID: string) {
    return this.http.delete(environment.bookURL + bookID);
  }
}
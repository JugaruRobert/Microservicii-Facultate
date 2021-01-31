import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Book, LoggedInUser } from 'src/app/shared/models/shared.models';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  bookID: string;
  selectedBook: Book;
  showDeleteBtn: Boolean = true;
  isEdit: Boolean = false;
  bookForm: FormGroup;
  shouldAdd: Boolean = false;
  loggedInUser: LoggedInUser;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.bookID = this.route.snapshot.params['bookID'];
    
    if(this.bookID === 'add') {
      this.createEmptyBook();
      this.isEdit = true;
      this.shouldAdd = true;
      this.showDeleteBtn = false;
      this.buildFormGroup();
    }
    else {
      this.loadBookDetails();
    }

    this.loggedInUser = this.loginService.getLoggedInUser();
  }

  deleteBook() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.apiService.deleteBook(this.selectedBook.id).subscribe(() => {
          this.router.navigate(['library']);
        });
      }
    });
  }

  removeBookImage() {
    this.selectedBook.coverImage = '';
  }

  public uploadImage(event) { 
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.selectedBook.coverImage = reader.result as string; 
    }    
  }

  editBook() {
    this.isEdit = true;
  }

  saveBook() {
    this.updateBookDetails();

    console.log(this.selectedBook);
    if(this.shouldAdd) {  
      this.apiService.addBook(this.selectedBook).subscribe((book) => {
        location.href = "/details/" + book.id;
      });
    } else {
      this.apiService.updateBook(this.selectedBook).subscribe((book) => {
        this.isEdit = false;
        this.successToast("Book details succesfully updated!");
      });
    }
  }

  private createEmptyBook() {
    this.selectedBook = <Book> {
      title: '',
      author: '',
      description:'',
      publisher: '',
      numberOfPages: 0,
      isbn: '',
      coverImage: ''
    }
  }

  private updateBookDetails() {
    this.selectedBook.title = this.bookForm.get('title').value;
    this.selectedBook.author = this.bookForm.get('author').value;
    this.selectedBook.description = this.bookForm.get('description').value;
    this.selectedBook.publisher = this.bookForm.get('publisher').value;
    this.selectedBook.numberOfPages = parseInt(this.bookForm.get('numberOfPages').value);
    this.selectedBook.isbn = this.bookForm.get('isbn').value;

    this.selectedBook.userEmail = this.loggedInUser.email;

    if(isNaN(this.selectedBook.numberOfPages))
      this.selectedBook.numberOfPages = 0;
  }

  private buildFormGroup() {
    this.bookForm = this.formBuilder.group({
      title: [this.selectedBook ? this.selectedBook.title : ''],
      author: [this.selectedBook ? this.selectedBook.author : ''],
      publisher: [this.selectedBook ? this.selectedBook.publisher : ''],
      numberOfPages: [this.selectedBook && this.selectedBook.numberOfPages > 0 ? this.selectedBook.numberOfPages : ''],
      isbn: [this.selectedBook ? this.selectedBook.isbn : ''],
      description: [this.selectedBook ? this.selectedBook.description : '']
    });
  }

  private loadBookDetails() {
    this.apiService.getBookDetails(this.bookID).subscribe((book: Book) => {
      if(!book) {
        this.router.navigate(['library']);
      }

      this.selectedBook = book;
      this.buildFormGroup();
    })
  }

  private successToast(message: string) {
    this.toastr.success(message,'', {
      timeOut: 1500,
    });
  }
}
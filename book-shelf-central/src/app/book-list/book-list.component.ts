import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BookShelfService } from '../book-shelf.service';
import { ALERTS, AuthorList, Book, Constants, DataModel } from '../model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @ViewChild('content') content!: TemplateRef<FormGroup>;

  data!: AuthorList;
  authorName!: string;
  books!: Book[];
  bookInfo!: Book;
  showAlert: boolean = false;
  indexVal!: number;
  isAddMode: boolean = true;
  selectedIndex: any;
  bookValue!: Book;
  storedBooks!: string | null;
  sortByTitle: boolean = true;
  alertMessage: string = '';

  constructor(
    private bookShelfService: BookShelfService,
    private modalService: NgbModal
  ) {}

  // To initialize the component
  ngOnInit(): void {
    this.storedBooks = localStorage.getItem('data');
    this.storedBooks
      ? (this.data = JSON.parse(this.storedBooks))
      : this.getBooks();
    this.books = this.data.books;
    this.sortBooks();
  }

  // To call GET API to retrieve the data from JSON
  getBooks(): void {
    this.bookShelfService.getBookList().subscribe((result: DataModel) => {
      if (result.status == Constants.SUCCESS) {
        this.data = result.data;
        localStorage.setItem('data', JSON.stringify(this.data));
        this.books = this.data.books;
        this.sortBooks();
      }
    });
  }

  // To open add or modify modal based on the action
  openAddEditModal(content: TemplateRef<FormGroup>, action?: string): void {
    if (action == 'modify') {
      this.isAddMode = false;
    } else {
      this.isAddMode = true;
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(() => {});
  }

  // To submit add or modify form modal based on mode
  onSubmit(bookValue: Book): void {
    if (this.isAddMode) {
      this.books.unshift(bookValue);
      this.showAlertfn(ALERTS.ADD);
    } else {
      this.books[this.selectedIndex] = bookValue;
      this.showAlertfn(ALERTS.UPDATE);
    }
    this.modalService.dismissAll();
    this.updateBooks(this.books);
  }

  // To set the updated books in local storage
  updateBooks(books: Book[]): void {
    this.data.books = books;
    localStorage.setItem('data', JSON.stringify(this.data));
    this.sortBooks();
  }

  // To clear the local storage
  onReset(): void {
    localStorage.clear();
    this.getBooks();
    this.showAlertfn(ALERTS.RESET);
  }

  // To close add or modify form modal
  close(): void {
    this.showAlert = false;
  }

  // To identify whether modify or delete button is clicked
  getActionID(value: string): void {
    let action = value.split('-')[0];
    let index = Number(value.split('-')[1]);
    console.log('got it ', action, index);
    if (action == 'delete') {
      this.books.splice(index, 1);
      this.updateBooks(this.books);
      this.showAlertfn(ALERTS.DELETE);
    } else if (action == 'modify') {
      this.selectedIndex = index;
      this.bookValue = this.books[index];
      this.openAddEditModal(this.content, action);
    }
  }

  // To toggle the sort options
  toggleSort(): void {
    this.sortByTitle = !this.sortByTitle;
    this.sortBooks();
  }

  // To sort the books
  sortBooks(): void {
    this.books.sort((a, b) => {
      if (this.sortByTitle) {
        return a.title.localeCompare(b.title);
      } else {
        return Number(a.PublishDate) - Number(b.PublishDate);
      }
    });
  }

  // To Show Alert message
  showAlertfn(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }
}

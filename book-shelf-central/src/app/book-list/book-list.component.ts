import { Component, OnInit } from '@angular/core';
import { BookShelfService } from '../book-shelf.service';
import { AuthorList, Book, Constants, DataModel } from '../model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  data!: AuthorList;
  authorName!: string;
  books!: Book[];
  bookInfo!: Book;
  bookForm!: FormGroup;
  constructor(private bookShelfService: BookShelfService,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      purchaseLink: new FormControl('', Validators.required),
      publishDate: new FormControl('', Validators.required)
    });
    this.getBooks();
  }

  getBooks() {
    this.bookShelfService.getBookList().subscribe((result: DataModel) => {
      if (result.status == Constants.SUCCESS) {
        this.data = result.data;
        this.books = this.data.books;
      }
    });
  }

  openAddEditModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				console.log(result,"res");
			},
			(reason) => {
				console.log(reason,"rea");
        this.bookForm.reset();
			},
		);
  }

  onSubmit(){
    console.log(this.bookForm,"form");
    this.modalService.dismissAll();
    // perform add book operation here 
  }
}

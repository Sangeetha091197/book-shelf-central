import { Component, OnInit } from '@angular/core';
import { BookShelfService } from '../book-shelf.service';
import { Alert, ALERTS, AuthorList, Book, Constants, DataModel } from '../model';
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
  booksLocal!: void;
  storedBlogs!: string | null;
  bookAdded: boolean = false;
  indexVal!:number;
  
  constructor(private bookShelfService: BookShelfService,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      purchaseLink: new FormControl('', Validators.required),
      PublishDate: new FormControl('', [Validators.required, Validators.pattern(Constants.YEAR_PATTERN)]),
    });
    this.storedBlogs = (localStorage.getItem('data'));
    const first = this.storedBlogs ? this.data = JSON.parse(this.storedBlogs): this.getBooks();
    this.books = this.data.books;
    console.log(first, "here");
  }

  getBooks() {
    this.bookShelfService.getBookList().subscribe((result: DataModel) => {
      if (result.status == Constants.SUCCESS) {
        this.data = result.data;
        localStorage.setItem("data", JSON.stringify(this.data));
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
    console.log(this.bookForm.value,"form");
    this.books.unshift(this.bookForm.value);
    this.updateBooks(this.books);
    this.modalService.dismissAll();
    this.bookAdded= true;
    setTimeout(() => {
    this.bookAdded= false;
    }, 5000);

    // perform add book operation here 
  }

  updateBooks(books:any){
    this.data.books =books;
    localStorage.setItem("data", JSON.stringify(this.data));
  }

  onReset(){
    localStorage.clear();
    this.getBooks();
  }

  close() {
		this.bookAdded= false;
	}

  getActionID(value:any){
    let action = value.split('-')[0];
    let index = value.split('-')[1];
    console.log("got it ",action,index)
    this.books.splice(index,1);
    this.updateBooks(this.books);
  }
}

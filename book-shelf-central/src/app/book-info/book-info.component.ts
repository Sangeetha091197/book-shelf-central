import { Component, Input } from '@angular/core';
import { Book } from '../model';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent {
  @Input() bookInfo!: Book;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../model';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class BookInfoComponent {
  @Input() bookInfo!: Book;
  @Input() indexVal!: number;
  @Output() actionID = new EventEmitter<string>();

  constructor() {}

  // To identify whether modify or delete is clicked
  emitAction(event: Event): void {
    const actionID = (event.target as Element).id;
    this.actionID.emit(actionID);
  }
}

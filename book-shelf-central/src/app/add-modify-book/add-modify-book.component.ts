import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book, Constants } from '../model';

@Component({
  selector: 'app-add-modify-book',
  templateUrl: './add-modify-book.component.html',
  styleUrls: ['./add-modify-book.component.scss'],
})
export class AddModifyBookComponent implements OnInit {
  @Input() isAddMode: boolean = true;
  @Input() bookValue!: Book;
  @Output() closeEvent = new EventEmitter<Book>();
  @Output() submitEvent = new EventEmitter<Book>();

  bookForm!: FormGroup;

  constructor() {}

  // To initialize the component with form group
  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      purchaseLink: new FormControl('', Validators.required),
      PublishDate: new FormControl('', [
        Validators.required,
        Validators.pattern(Constants.YEAR_PATTERN),
      ]),
    });
    if (this.isAddMode == false) {
      this.bookForm.patchValue(this.bookValue);
    }
  }

  // On click of save or update button in form
  onSubmitEvent(): void {
    this.submitEvent.emit(this.bookForm.value);
  }

  // To close the modal and reset the form
  close(): void {
    this.bookForm.reset();
    this.closeEvent.emit();
  }
}

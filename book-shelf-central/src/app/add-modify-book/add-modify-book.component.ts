import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book, Constants } from '../model';

@Component({
  selector: 'app-add-modify-book',
  templateUrl: './add-modify-book.component.html',
  styleUrls: ['./add-modify-book.component.scss'],
})
export class AddModifyBookComponent implements OnInit {
  bookForm!: FormGroup;
  @Input() isAddMode: boolean = true;
  @Input() bookValue!: Book;
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  constructor() {}

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

  onSubmitEvent() {
    this.submitEvent.emit(this.bookForm.value);
  }

  close() {
    this.bookForm.reset();
    this.closeEvent.emit();
  }
}

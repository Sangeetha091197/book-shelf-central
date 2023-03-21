import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyBookComponent } from './add-modify-book.component';

describe('AddModifyBookComponent', () => {
  let component: AddModifyBookComponent;
  let fixture: ComponentFixture<AddModifyBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifyBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModifyBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

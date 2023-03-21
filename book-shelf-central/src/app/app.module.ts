import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { AddModifyBookComponent } from './add-modify-book/add-modify-book.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    BookListComponent,
    BookInfoComponent,
    AddModifyBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

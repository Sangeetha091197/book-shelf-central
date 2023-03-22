import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel } from './model';

@Injectable({
  providedIn: 'root',
})
export class BookShelfService {
  constructor(private httpClient: HttpClient) {}

  // To retrive the data from JSON file
  getBookList(): Observable<DataModel> {
    return this.httpClient.get<DataModel>(
      'https://s3.amazonaws.com/api-fun/books.json'
    );
  }
}

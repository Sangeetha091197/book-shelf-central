import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel } from './model';

@Injectable({
  providedIn: 'root'
})
export class BookShelfService {

  constructor(private httpClient: HttpClient) {}

  getBookList(): Observable<DataModel> {
    return this.httpClient.get<DataModel>("https://s3.amazonaws.com/api-fun/books.json");
  }
}

export interface DataModel {
  data: AuthorList;
  status: string;
}

export interface AuthorList {
  author: string;
  birthday: string;
  birthPlace: string;
  books: Book[];
}

export interface Book {
  imageUrl: string;
  title: string;
  purchaseLink: string;
  PublishDate: string;
}

export enum Constants {
  SUCCESS = 'success',
  YEAR_PATTERN = '[0-9]{4}$',
}


export const ALERTS = {
  ADD:'New Book information added successfully',
  UPDATE: 'Book information Updated successfully',
  DELETE: 'Book Information deleted successfully',
  RESET: 'Page is now reset to original data from the server'
};

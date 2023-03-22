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

export interface Alert {
  type: string;
  message: string;
}

export const ALERTS: Alert[] = [
  {
    type: 'success',
    message: 'This is an success alert',
  },
];

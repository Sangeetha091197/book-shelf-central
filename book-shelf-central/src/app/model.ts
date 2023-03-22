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
  SUCCESS = "success",
  YEAR_PATTERN = "[0-9]{4}$"
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
	{
		type: 'info',
		message: 'This is an info alert',
	},
	{
		type: 'warning',
		message: 'This is a warning alert',
	},
	{
		type: 'danger',
		message: 'This is a danger alert',
	},
	{
		type: 'primary',
		message: 'This is a primary alert',
	},
	{
		type: 'secondary',
		message: 'This is a secondary alert',
	},
	{
		type: 'light',
		message: 'This is a light alert',
	},
	{
		type: 'dark',
		message: 'This is a dark alert',
	},
];
import { APIError } from 'types';

export type Order = {
  id?: string;
  title: string;
  bookingDate: string;
  address: string;
  customer: string;
};

export type OrdersState = {
  isFetching: boolean;
  data: Order[];
  error: APIError | null;
};

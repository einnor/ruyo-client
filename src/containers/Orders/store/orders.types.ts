import { APIError } from 'types';

export type Address = {
  city: string;
  zip: string;
  street: string;
  country: string;
};

export type Customer = {
  email: string;
  phone: string;
  name: string;
};

export type Order = {
  id?: string;
  title: string;
  bookingDate: number;
  address: Address;
  customer: Customer;
};

export type OrdersState = {
  isFetching: boolean;
  data: Order[];
  error: APIError | null;
};

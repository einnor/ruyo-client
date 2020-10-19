import { APIError } from 'types';

export type User = {
  email: string;
  name: string;
  phone: string;
  uid: string;
};

export type AuthenticationState = {
  isFetching: boolean;
  data: User;
  token: string | null;
  uid: string | null;
  error: APIError | null;
};

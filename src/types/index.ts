export interface IOrder {
  id?: string;
  title: string;
  bookingDate: string;
  address: string;
  customer: string;
}

export interface APIError {
  error: string;
  message: string;
  status: string | number;
  body?: any;
}

export interface FluxStandardAction {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: any;
}

export type ActionCreator = () => FluxStandardAction;

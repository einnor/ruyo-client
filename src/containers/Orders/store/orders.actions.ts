import { FluxStandardAction, APIError } from 'types';
import { Order } from './orders.types';

// Action Types
export const GET_ORDERS_REQUEST: string = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS: string = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE: string = 'GET_ORDERS_FAILURE';

export const GET_ORDER_REQUEST: string = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: string = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILURE: string = 'GET_ORDER_FAILURE';

export const UPDATE_ORDER_REQUEST: string = 'UPDATE_ORDER_REQUEST';
export const UPDATE_ORDER_SUCCESS: string = 'UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_FAILURE: string = 'UPDATE_ORDER_FAILURE';

// Actions
// GET ORDERS
export type GetOrdersRequest = () => FluxStandardAction;
export const getOrdersRequest: GetOrdersRequest = () => {
  return {
    type: GET_ORDERS_REQUEST,
  };
};

export type GetOrdersSuccess = (payload: Order[]) => FluxStandardAction;
export const getOrdersSuccess: GetOrdersSuccess = (payload) => {
  return {
    type: GET_ORDERS_SUCCESS,
    payload,
  };
};

export type GetOrdersFailure = (error: APIError) => FluxStandardAction;
export const getOrdersFailure: GetOrdersFailure = (error) => {
  return {
    type: GET_ORDERS_FAILURE,
    payload: { error },
    error: true,
  };
};

// GET ORDER
export type GetOrderRequest = (id: string) => FluxStandardAction;
export const getOrderRequest: GetOrderRequest = (id) => {
  return {
    type: GET_ORDER_REQUEST,
    payload: { id },
  };
};

export type GetOrderSuccess = (payload: Order) => FluxStandardAction;
export const getOrderSuccess: GetOrderSuccess = (payload) => {
  return {
    type: GET_ORDER_SUCCESS,
    payload,
  };
};

export type GetOrderFailure = (error: APIError) => FluxStandardAction;
export const getOrderFailure: GetOrderFailure = (error) => {
  return {
    type: GET_ORDER_FAILURE,
    payload: { error },
    error: true,
  };
};

// UPDATE ORDER
export type UpdateOrderRequest = (
  id: string,
  order: Order,
) => FluxStandardAction;
export const updateOrderRequest: UpdateOrderRequest = (id, order) => {
  return {
    type: UPDATE_ORDER_REQUEST,
    payload: { id, order },
  };
};

export type UpdateOrderSuccess = (payload: Order) => FluxStandardAction;
export const updateOrderSuccess: UpdateOrderSuccess = (payload) => {
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload,
  };
};

export type UpdateOrderFailure = (error: APIError) => FluxStandardAction;
export const updateOrderFailure: UpdateOrderFailure = (error) => {
  return {
    type: UPDATE_ORDER_FAILURE,
    payload: { error },
    error: true,
  };
};

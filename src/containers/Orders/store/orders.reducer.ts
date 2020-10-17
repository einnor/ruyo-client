import { OrdersState } from './orders.types';
import { FluxStandardAction } from 'types';
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
} from './orders.actions';

export const initialState: OrdersState = {
  isFetching: false,
  data: [],
  error: null,
};

const reducer = (
  state: OrdersState = initialState,
  action: FluxStandardAction,
) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };

    case GET_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

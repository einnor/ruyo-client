import { FluxStandardAction, APIError } from 'types';
import { OrdersState, Order } from './orders.types';
import ordersReducer, { initialState } from './orders.reducer';
import * as actions from './orders.actions';

describe('Orders - Reducer', () => {
  let state: OrdersState;

  describe('Get Orders', () => {
    beforeEach(() => (state = { ...initialState }));

    it('should handle action: GET_ORDERS_REQUEST', () => {
      const action: FluxStandardAction = {
        type: actions.GET_ORDERS_REQUEST,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(true);
      expect(reduced.error).toBeNull();
      expect(reduced.data).toEqual([]);
    });

    it('should handle action: GET_ORDERS_SUCCESS', () => {
      const payload: Order[] = [
        {
          id: '1',
          title: 'Test',
          bookingDate: '12/12/2020',
          address: '86-10300, Kerugoya',
          customer: 'John Doe',
        },
      ];

      const action: FluxStandardAction = {
        type: actions.GET_ORDERS_SUCCESS,
        payload,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.data).toEqual(payload);
      expect(reduced.error).toBeNull();
    });

    it('should handle action: GET_ORDERS_FAILURE', () => {
      const payload: APIError = {
        error: 'Here is an error',
        message: 'Some error about failure',
        status: 500,
      };

      const action: FluxStandardAction = {
        type: actions.GET_ORDERS_FAILURE,
        payload,
        error: true,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.data).toEqual([]);
      expect(reduced.error).toEqual(payload);
    });
  });

  describe('Get Order', () => {
    beforeEach(() => (state = { ...initialState }));

    it('should handle action: GET_ORDER_REQUEST', () => {
      const action: FluxStandardAction = {
        type: actions.GET_ORDER_REQUEST,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(true);
      expect(reduced.error).toBeNull();
      expect(reduced.data).toEqual([]);
    });

    it('should handle action: GET_ORDER_SUCCESS', () => {
      const payload: Order = {
        id: '1',
        title: 'Test',
        bookingDate: '12/12/2020',
        address: '86-10300, Kerugoya',
        customer: 'John Doe',
      };

      const action: FluxStandardAction = {
        type: actions.GET_ORDER_SUCCESS,
        payload,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.data).toEqual([payload]);
      expect(reduced.error).toBeNull();
    });

    it('should handle action: GET_ORDER_FAILURE', () => {
      const payload: APIError = {
        error: 'Here is an error',
        message: 'Some error about failure',
        status: 500,
      };

      const action: FluxStandardAction = {
        type: actions.GET_ORDER_FAILURE,
        payload,
        error: true,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.data).toEqual([]);
      expect(reduced.error).toEqual(payload);
    });
  });
});

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
          bookingDate: 1554284950000,
          address: {
            city: 'Berlin',
            country: 'Germany',
            street: '"Wriezener Str. 12',
            zip: '13055',
          },
          customer: {
            email: 'john.doe@example.com',
            phone: '0123456789',
            name: 'John Doe',
          },
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
        bookingDate: 1554284950000,
        address: {
          city: 'Berlin',
          country: 'Germany',
          street: '"Wriezener Str. 12',
          zip: '13055',
        },
        customer: {
          email: 'john.doe@example.com',
          phone: '0123456789',
          name: 'John Doe',
        },
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

  describe('Update Order', () => {
    beforeEach(() => (state = { ...initialState }));

    it('should handle action: UPDATE_ORDER_REQUEST', () => {
      const id = '1';
      const order = {
        id: '1',
        title: 'Test - Updated',
        bookingDate: 1554284950000,
        address: {
          city: 'Berlin',
          country: 'Germany',
          street: '"Wriezener Str. 12',
          zip: '13055',
        },
        customer: {
          email: 'john.doe@example.com',
          phone: '0123456789',
          name: 'John Doe',
        },
      };
      const action: FluxStandardAction = {
        type: actions.UPDATE_ORDER_REQUEST,
        payload: { id, order },
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(true);
      expect(reduced.error).toBeNull();
      expect(reduced.data).toEqual([]);
    });

    it('should handle action: UPDATE_ORDER_SUCCESS', () => {
      const payload: Order = {
        id: '1',
        title: 'Test - Updated',
        bookingDate: 1554284950000,
        address: {
          city: 'Berlin',
          country: 'Germany',
          street: '"Wriezener Str. 12',
          zip: '13055',
        },
        customer: {
          email: 'john.doe@example.com',
          phone: '0123456789',
          name: 'John Doe',
        },
      };

      const action: FluxStandardAction = {
        type: actions.UPDATE_ORDER_SUCCESS,
        payload,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.data).toEqual([payload]);
      expect(reduced.error).toBeNull();
    });

    it('should handle action: UPDATE_ORDER_FAILURE', () => {
      const payload: APIError = {
        error: 'Here is an error',
        message: 'Some error about failure',
        status: 500,
      };

      const action: FluxStandardAction = {
        type: actions.UPDATE_ORDER_FAILURE,
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

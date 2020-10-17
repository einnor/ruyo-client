import * as actions from './orders.actions';
import { APIError } from 'types';
import { Order } from './orders.types';

describe('Orders - Actions', () => {
  let error: APIError;

  beforeAll(() => {
    error = {
      error: 'Here is an error',
      message: 'Some error about failure',
      status: 500,
    };
  });

  describe('Get Orders', () => {
    it('should fetch all orders', () => {
      const expectedAction = {
        type: actions.GET_ORDERS_REQUEST,
      };

      const actionCreator = actions.getOrdersRequest();
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return payload on success', () => {
      const payload: Order[] = [
        {
          id: '1',
          title: 'Test',
          bookingDate: '12/12/2020',
          address: '86-10300, Kerugoya',
          customer: 'John Doe',
        },
      ];
      const expectedAction = {
        type: actions.GET_ORDERS_SUCCESS,
        payload: payload,
      };

      const actionCreator = actions.getOrdersSuccess(payload);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return error on failure', () => {
      const expectedAction = {
        type: actions.GET_ORDERS_FAILURE,
        payload: { error },
        error: true,
      };

      const actionCreator = actions.getOrdersFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });

  describe('Get Order', () => {
    it('should fetch an order by id', () => {
      const id = '1';
      const expectedAction = {
        type: actions.GET_ORDER_REQUEST,
        payload: { id },
      };

      const actionCreator = actions.getOrderRequest(id);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return payload on success', () => {
      const payload: Order = {
        id: '1',
        title: 'Test',
        bookingDate: '12/12/2020',
        address: '86-10300, Kerugoya',
        customer: 'John Doe',
      };
      const expectedAction = {
        type: actions.GET_ORDER_SUCCESS,
        payload: payload,
      };

      const actionCreator = actions.getOrderSuccess(payload);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return error on failure', () => {
      const expectedAction = {
        type: actions.GET_ORDER_FAILURE,
        payload: { error },
        error: true,
      };

      const actionCreator = actions.getOrderFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });
});

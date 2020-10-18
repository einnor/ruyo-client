import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { Order } from './orders.types';
import * as actions from './orders.actions';
import * as sagas from './orders.sagas';
import { APIError, FluxStandardAction } from 'types';
import OrderApi from 'services/Order';

describe('Orders - Sagas', () => {
  const error: APIError = {
    error: 'An incoming error',
    message: 'Heads up',
    status: 500,
  };

  describe('Get Orders', () => {
    const action: FluxStandardAction = {
      type: actions.GET_ORDERS_REQUEST,
    };

    it('should handle a successful request', () => {
      const expectedResult: Order[] = [
        {
          id: '1',
          title: 'Test',
          bookingDate: '12/12/2020',
          address: '86-10300, Kerugoya',
          customer: 'John Doe',
        },
      ];

      return expectSaga(sagas.getOrdersRequest, action)
        .provide([[matchers.call(OrderApi.fetchAll), expectedResult]])
        .put(actions.getOrdersSuccess(expectedResult))
        .run();
    });

    it('should handle an unsuccessfully request', () => {
      return expectSaga(sagas.getOrdersRequest, action)
        .provide([[matchers.call(OrderApi.fetchAll), Promise.reject(error)]])
        .put(actions.getOrdersFailure(error))
        .run();
    });
  });

  describe('Get Order', () => {
    const id = '1';
    const action: FluxStandardAction = {
      type: actions.GET_ORDER_REQUEST,
      payload: { id },
    };

    it('should handle a successful request', () => {
      const expectedResult: Order = {
        id: '1',
        title: 'Test',
        bookingDate: '12/12/2020',
        address: '86-10300, Kerugoya',
        customer: 'John Doe',
      };

      return expectSaga(sagas.getOrderRequest, action)
        .provide([[matchers.call(OrderApi.fetchById, id), expectedResult]])
        .put(actions.getOrderSuccess(expectedResult))
        .run();
    });

    it('should handle an unsuccessfully request', () => {
      const id = '1';
      return expectSaga(sagas.getOrderRequest, action)
        .provide([
          [matchers.call(OrderApi.fetchById, id), Promise.reject(error)],
        ])
        .put(actions.getOrderFailure(error))
        .run();
    });
  });
});

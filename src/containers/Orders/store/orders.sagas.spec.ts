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

      return expectSaga(sagas.getOrdersRequest, action)
        .provide([[matchers.call(OrderApi.fetchAll), expectedResult]])
        .put(actions.getOrdersSuccess(expectedResult))
        .run();
    });

    it('should handle an unsuccessful request', () => {
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

      return expectSaga(sagas.getOrderRequest, action)
        .provide([[matchers.call(OrderApi.fetchById, id), expectedResult]])
        .put(actions.getOrderSuccess(expectedResult))
        .run();
    });

    it('should handle an unsuccessful request', () => {
      return expectSaga(sagas.getOrderRequest, action)
        .provide([
          [matchers.call(OrderApi.fetchById, id), Promise.reject(error)],
        ])
        .put(actions.getOrderFailure(error))
        .run();
    });
  });

  describe('Update Order', () => {
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
      type: actions.GET_ORDER_REQUEST,
      payload: { id, order },
    };

    it('should handle a successful request', () => {
      const expectedResult: Order = order;

      return expectSaga(sagas.updateOrderRequest, action)
        .provide([[matchers.call(OrderApi.update, id, order), expectedResult]])
        .put(actions.updateOrderSuccess(expectedResult))
        .run();
    });

    it('should handle an unsuccessful request', () => {
      return expectSaga(sagas.updateOrderRequest, action)
        .provide([
          [matchers.call(OrderApi.update, id, order), Promise.reject(error)],
        ])
        .put(actions.updateOrderFailure(error))
        .run();
    });
  });
});

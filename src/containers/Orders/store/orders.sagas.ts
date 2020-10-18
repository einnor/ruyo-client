import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import Api from 'services/Api';
import Order from 'services/Order';
import { SagaIterator } from 'redux-saga';
import * as actions from './orders.actions';
import { FluxStandardAction } from 'types';

export default function* ordersWatcher(): SagaIterator {
  yield takeLatest(actions.GET_ORDERS_REQUEST, getOrdersRequest);
  yield takeLatest(actions.GET_ORDER_REQUEST, getOrderRequest);
  yield takeLatest(actions.UPDATE_ORDER_REQUEST, updateOrderRequest);
}

export function* getOrdersRequest(action: FluxStandardAction): SagaIterator {
  try {
    // Make API request.
    const payload = yield call(Order.fetchAll);

    // Dispatch action for successful request.
    yield put(actions.getOrdersSuccess(payload));
  } catch (error) {
    // Dispatch action for failed request.
    yield put(actions.getOrdersFailure(error));
  }
}

export function* getOrderRequest(action: FluxStandardAction): SagaIterator {
  const { id } = action.payload;
  try {
    // Make API request.
    const payload = yield call(Order.fetchById, id);

    // Dispatch action for successful request.
    yield put(actions.getOrderSuccess(payload));
  } catch (error) {
    // Dispatch action for failed request.
    yield put(actions.getOrderFailure(error));
  }
}

export function* updateOrderRequest(action: FluxStandardAction): SagaIterator {
  const { id, order } = action.payload;
  try {
    // Make API request.
    const payload = yield call(Order.update, id, order);

    // Dispatch action for successful request.
    yield put(actions.updateOrderSuccess(payload));
  } catch (error) {
    // Dispatch action for failed request.
    yield put(actions.updateOrderFailure(error));
  }
}

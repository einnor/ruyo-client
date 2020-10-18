import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import Api from 'services/Api';
import Order from 'services/Order';
import { SagaIterator } from 'redux-saga';
import * as actions from './orders.actions';
import { FluxStandardAction } from 'types';

export default function* ordersWatcher(): SagaIterator {
  yield takeLatest(actions.GET_ORDERS_REQUEST, getOrdersRequest);
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

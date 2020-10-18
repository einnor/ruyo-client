import { all } from 'redux-saga/effects';

import ordersWatcher from 'containers/Orders/store/orders.sagas';

export default function* rootSaga() {
  yield all([ordersWatcher()]);
}

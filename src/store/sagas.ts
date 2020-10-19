import { all } from 'redux-saga/effects';

import ordersWatcher from 'containers/Orders/store/orders.sagas';
import auhthenticationWatcher from 'containers/Authentication/store/authentication.sagas';

export default function* rootSaga() {
  yield all([ordersWatcher(), auhthenticationWatcher()]);
}

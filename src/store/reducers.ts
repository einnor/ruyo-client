import { combineReducers } from 'redux';

import orders from 'containers/Orders/store/orders.reducer';
import authentication from 'containers/Authentication/store/authentication.reducer';

const rootReducer = combineReducers({
  orders,
  authentication,
});

export default rootReducer;

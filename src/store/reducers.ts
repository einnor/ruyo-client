import { combineReducers } from 'redux';

import orders from 'containers/Orders/store/orders.reducer';

const rootReducer = combineReducers({
  orders,
});

export default rootReducer;

import IGlobalState from 'types';
import { OrdersState } from './orders.types';
import * as selectors from './orders.selectors';
import { initialState } from './orders.reducer';

describe('Orders - Selectors', () => {
  let state: OrdersState;

  beforeAll(() => {
    state = { ...initialState };
  });

  it('should return isFetching', () => {
    const isFetching = selectors.getIsFetching({
      orders: state,
    } as IGlobalState);
    expect(isFetching).toEqual(state.isFetching);
  });

  it('should return orders data', () => {
    const data = selectors.getData({ orders: state } as IGlobalState);
    expect(data).toEqual(state.data);
  });

  it('should return error', () => {
    const error = selectors.getError({ orders: state } as IGlobalState);
    expect(error).toEqual(state.error);
  });
});

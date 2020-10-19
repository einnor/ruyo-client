import IGlobalState from 'types';
import { AuthenticationState } from './authentication.types';
import * as selectors from './authentication.selectors';
import { initialState } from './authentication.reducer';

describe('Authentication - Selectors', () => {
  let state: AuthenticationState;

  beforeAll(() => {
    state = { ...initialState };
  });

  it('should return isFetching', () => {
    const isFetching = selectors.getIsFetching({
      authentication: state,
    } as IGlobalState);
    expect(isFetching).toEqual(state.isFetching);
  });

  it('should return uid', () => {
    const uid = selectors.getUID({ authentication: state } as IGlobalState);
    expect(uid).toEqual(state.uid);
  });

  it('should return user data', () => {
    const data = selectors.getData({ authentication: state } as IGlobalState);
    expect(data).toEqual(state.data);
  });

  it('should return error', () => {
    const error = selectors.getError({ authentication: state } as IGlobalState);
    expect(error).toEqual(state.error);
  });
});

import { FluxStandardAction, APIError } from 'types';
import { AuthenticationState, User } from './authentication.types';
import ordersReducer, { initialState } from './authentication.reducer';
import * as actions from './authentication.actions';

describe('Orders - Reducer', () => {
  let state: AuthenticationState;
  const email = 'john.doe@example.com';
  const password = 'password';

  describe('Sign In', () => {
    beforeEach(() => (state = { ...initialState }));

    it('should handle action: SIGN_IN_REQUEST', () => {
      const action: FluxStandardAction = {
        type: actions.SIGN_IN_REQUEST,
        payload: { email, password },
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(true);
      expect(reduced.error).toBeNull();
      expect(reduced.data).toBeNull();
      expect(reduced.uid).toBeNull();
    });

    it('should handle action: SIGN_IN_SUCCESS', () => {
      const uid = '78594hriweu';
      const payload = uid;
      const action: FluxStandardAction = {
        type: actions.SIGN_IN_SUCCESS,
        payload,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.data).toBeNull();
      expect(reduced.error).toBeNull();
      expect(reduced.uid).toEqual(payload);
    });

    it('should handle action: SIGN_IN_FAILURE', () => {
      const payload: APIError = {
        error: 'Here is an error',
        message: 'Some error about failure',
        status: 500,
      };

      const action: FluxStandardAction = {
        type: actions.SIGN_IN_FAILURE,
        payload,
        error: true,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.data).toBeNull();
      expect(reduced.uid).toBeNull();
      expect(reduced.error).toEqual(payload);
    });
  });

  describe('Sign Out', () => {
    beforeEach(
      () =>
        (state = {
          uid: 'uid',
          data: {
            email,
            name: 'John Doe',
            phone: '0123456789',
            uid: '5iEm1HvIxubLaiKO4yj0Npmvq0F2',
          },
          isFetching: false,
          error: null,
        }),
    );

    it('should handle action: SING_OUT_REQUEST', () => {
      const action: FluxStandardAction = {
        type: actions.SIGN_OUT_REQUEST,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(true);
      expect(reduced.error).toBeNull();
      expect(reduced.data).toEqual({
        email,
        name: 'John Doe',
        phone: '0123456789',
        uid: '5iEm1HvIxubLaiKO4yj0Npmvq0F2',
      });
      expect(reduced.uid).toEqual('uid');
    });

    it('should handle action: SIGN_OUT_SUCCESS', () => {
      const action: FluxStandardAction = {
        type: actions.SIGN_OUT_SUCCESS,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.data).toBeNull();
      expect(reduced.uid).toBeNull();
      expect(reduced.error).toBeNull();
    });

    it('should handle action: SIGN_OUT_FAILURE', () => {
      const payload: APIError = {
        error: 'Here is an error',
        message: 'Some error about failure',
        status: 500,
      };

      const action: FluxStandardAction = {
        type: actions.SIGN_OUT_FAILURE,
        payload,
        error: true,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.uid).toEqual('uid');
      expect(reduced.data).toEqual({
        email,
        name: 'John Doe',
        phone: '0123456789',
        uid: '5iEm1HvIxubLaiKO4yj0Npmvq0F2',
      });
      expect(reduced.error).toEqual(payload);
    });
  });

  describe('Get User', () => {
    beforeEach(
      () =>
        (state = {
          uid: 'uid',
          data: null,
          isFetching: false,
          error: null,
        }),
    );

    it('should handle action: GET_USER_REQUEST', () => {
      const action: FluxStandardAction = {
        type: actions.GET_USER_REQUEST,
        payload: { uid: state.uid },
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(true);
      expect(reduced.uid).toEqual('uid');
      expect(reduced.error).toBeNull();
      expect(reduced.data).toBeNull();
    });

    it('should handle action: GET_USER_SUCCESS', () => {
      const payload: User = {
        email,
        name: 'John Doe',
        phone: '0123456789',
        uid: '5iEm1HvIxubLaiKO4yj0Npmvq0F2',
      };

      const action: FluxStandardAction = {
        type: actions.GET_USER_SUCCESS,
        payload,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.uid).toEqual('uid');
      expect(reduced.data).toEqual(payload);
      expect(reduced.error).toBeNull();
    });

    it('should handle action: GET_USER_FAILURE', () => {
      const payload: APIError = {
        error: 'Here is an error',
        message: 'Some error about failure',
        status: 500,
      };

      const action: FluxStandardAction = {
        type: actions.GET_USER_FAILURE,
        payload,
        error: true,
      };

      const reduced = ordersReducer(state, action);

      expect(reduced.isFetching).toEqual(false);
      expect(reduced.uid).toEqual('uid');
      expect(reduced.data).toBeNull();
      expect(reduced.error).toEqual(payload);
    });
  });
});

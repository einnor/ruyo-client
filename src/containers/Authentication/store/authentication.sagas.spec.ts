import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { User } from './authentication.types';
import * as actions from './authentication.actions';
import * as sagas from './authentication.sagas';
import { APIError, FluxStandardAction } from 'types';
import AuthenticationApi from 'services/Authentication';

describe('Authentication - Sagas', () => {
  const error: APIError = {
    error: 'An incoming error',
    message: 'Heads up',
    status: 500,
  };
  const email = 'john.doe@example.com';
  const password = 'password';

  describe('Sign In', () => {
    const action: FluxStandardAction = {
      type: actions.SIGN_IN_REQUEST,
      payload: { email, password },
    };

    it('should handle a successful request', () => {
      const uid = 'uid ';
      const expectedResult = uid;

      return expectSaga(sagas.signInRequest, action)
        .provide([
          [
            matchers.call(AuthenticationApi.signIn, email, password),
            expectedResult,
          ],
        ])
        .put(actions.signInSuccess(expectedResult))
        .run();
    });

    // it('should handle an unsuccessful request', () => {
    //   return expectSaga(sagas.signInRequest, action)
    //     .provide([[matchers.call(AuthenticationApi.signIn), Promise.reject(error)]])
    //     .put(actions.signInFailure(error))
    //     .run();
    // });
  });

  describe('Get User', () => {
    const uid = '1';
    const action: FluxStandardAction = {
      type: actions.GET_USER_REQUEST,
      payload: { uid },
    };

    it('should handle a successful request', () => {
      const expectedResult: User = {
        email,
        name: 'John Doe',
        phone: '0123456789',
        uid: '5iEm1HvIxubLaiKO4yj0Npmvq0F2',
      };

      return expectSaga(sagas.getUserRequest, action)
        .provide([
          [matchers.call(AuthenticationApi.getUser, uid), expectedResult],
        ])
        .put(actions.getUserSuccess(expectedResult))
        .run();
    });

    it('should handle an unsuccessful request', () => {
      return expectSaga(sagas.getUserRequest, action)
        .provide([
          [
            matchers.call(AuthenticationApi.getUser, uid),
            Promise.reject(error),
          ],
        ])
        .put(actions.getUserFailure(error))
        .run();
    });
  });
});

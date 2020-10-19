import * as actions from './authentication.actions';
import { APIError } from 'types';
import { User } from './authentication.types';

describe('Authentication - Actions', () => {
  let error: APIError;
  let email = 'john.doe@example.com';
  let password = 'password';

  beforeAll(() => {
    error = {
      error: 'Here is an error',
      message: 'Some error about failure',
      status: 500,
    };
  });

  describe('Sign In', () => {
    it('should sign in a user', () => {
      const expectedAction = {
        type: actions.SIGN_IN_REQUEST,
        payload: { email, password },
      };

      const actionCreator = actions.signInRequest(email, password);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return payload on success', () => {
      const uid = '78923ihjd';
      const expectedAction = {
        type: actions.SIGN_IN_SUCCESS,
        payload: uid,
      };

      const actionCreator = actions.signInSuccess(uid);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return error on failure', () => {
      const expectedAction = {
        type: actions.SIGN_IN_FAILURE,
        payload: { error },
        error: true,
      };

      const actionCreator = actions.signInFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });

  describe('Sign Out', () => {
    it('should sign out a a logged in user', () => {
      const id = '1';
      const expectedAction = {
        type: actions.SIGN_OUT_REQUEST,
      };

      const actionCreator = actions.signOutRequest();
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should handle success', () => {
      const expectedAction = {
        type: actions.SIGN_OUT_SUCCESS,
      };

      const actionCreator = actions.signOutSuccess();
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return error on failure', () => {
      const expectedAction = {
        type: actions.SIGN_OUT_FAILURE,
        payload: { error },
        error: true,
      };

      const actionCreator = actions.signOutFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });

  describe('Get User', () => {
    it('should get a user by id', () => {
      const uid = '1';
      const expectedAction = {
        type: actions.GET_USER_REQUEST,
        payload: { uid },
      };

      const actionCreator = actions.getUserRequest(uid);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return payload on success', () => {
      const payload: User = {
        email,
        name: 'John Doe',
        phone: '0123456789',
        uid: '5iEm1HvIxubLaiKO4yj0Npmvq0F2',
      };
      const expectedAction = {
        type: actions.GET_USER_SUCCESS,
        payload: payload,
      };

      const actionCreator = actions.getUserSuccess(payload);
      expect(actionCreator).toEqual(expectedAction);
    });

    it('should return error on failure', () => {
      const expectedAction = {
        type: actions.GET_USER_FAILURE,
        payload: { error },
        error: true,
      };

      const actionCreator = actions.getUserFailure(error);
      expect(actionCreator).toEqual(expectedAction);
    });
  });
});

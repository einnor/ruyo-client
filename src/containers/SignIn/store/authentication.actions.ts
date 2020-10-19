import { FluxStandardAction, APIError } from 'types';
import { User } from './authentication.types';

// Action Types
export const SIGN_IN_REQUEST: string = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS: string = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE: string = 'SIGN_IN_FAILURE';

// Actions
// SIGN IN
export type SignInRequest = (
  email: string,
  password: string,
) => FluxStandardAction;
export const signInRequest: SignInRequest = (email, password) => {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password },
  };
};

export type SignInSuccess = (token: string) => FluxStandardAction;
export const signInSuccess: SignInSuccess = (token) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: token,
  };
};

export type SignInFailure = (error: APIError) => FluxStandardAction;
export const signInFailure: SignInFailure = (error) => {
  return {
    type: SIGN_IN_FAILURE,
    payload: { error },
    error: true,
  };
};

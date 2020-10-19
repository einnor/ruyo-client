import { FluxStandardAction, APIError } from 'types';
import { User } from './authentication.types';

// Action Types
export const SIGN_IN_REQUEST: string = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS: string = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE: string = 'SIGN_IN_FAILURE';

export const SIGN_OUT_REQUEST: string = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS: string = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE: string = 'SIGN_OUT_FAILURE';

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

// SIGN Out
export type SignOutRequest = () => FluxStandardAction;
export const signOutRequest: SignOutRequest = () => {
  return {
    type: SIGN_OUT_REQUEST,
  };
};

export type SignOutSuccess = () => FluxStandardAction;
export const signOutSuccess: SignOutSuccess = () => {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

export type SignOutFailure = (error: APIError) => FluxStandardAction;
export const signOutFailure: SignOutFailure = (error) => {
  return {
    type: SIGN_OUT_FAILURE,
    payload: { error },
    error: true,
  };
};

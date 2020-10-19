import { AuthenticationState } from './authentication.types';
import { FluxStandardAction } from 'types';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from './authentication.actions';

export const initialState: AuthenticationState = {
  isFetching: false,
  uid: null,
  token: null,
  data: null,
  error: null,
};

const reducer = (
  state: AuthenticationState = initialState,
  action: FluxStandardAction,
) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        uid: action.payload.uid,
        token: action.payload.token,
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case SIGN_OUT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case SIGN_OUT_SUCCESS:
      return {
        isFetching: false,
        uid: null,
        token: null,
        data: null,
        error: null,
      };

    case SIGN_OUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };

    case GET_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

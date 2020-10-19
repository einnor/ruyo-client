import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import Authentication from 'services/Authentication';
import { SagaIterator } from 'redux-saga';
import * as actions from './authentication.actions';
import { FluxStandardAction } from 'types';

export default function* auhthenticationWatcher(): SagaIterator {
  yield takeLatest(actions.SIGN_IN_REQUEST, signInRequest);
  yield takeLatest(actions.GET_USER_REQUEST, getUserRequest);
}

export function* signInRequest(action: FluxStandardAction): SagaIterator {
  const { email, password } = action.payload;
  try {
    // Make API request.
    const payload = yield call(Authentication.signIn, email, password);

    // Dispatch action for successful request.
    yield put(actions.signInSuccess(payload));
  } catch (error) {
    // Dispatch action for failed request.
    yield put(actions.signInFailure(error));
  }
}

export function* getUserRequest(action: FluxStandardAction): SagaIterator {
  const { uid } = action.payload;
  try {
    // Make API request.
    const payload = yield call(Authentication.getUser, uid);

    // Dispatch action for successful request.
    yield put(actions.getUserSuccess(payload));
  } catch (error) {
    // Dispatch action for failed request.
    yield put(actions.getUserFailure(error));
  }
}

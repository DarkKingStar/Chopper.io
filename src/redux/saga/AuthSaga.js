import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi, postApi} from '../ApiRequest';
import showErrorAlert from '../../utils/helpers/Toast';
import constants from '../../constants/constants';

import {
  setUserToken,
  guestLoginSuccess,
  guestLoginFailure,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  logoutSuccess,
  logoutFailure,
} from '../reducer/AuthReducer';
import routes from '../../constants/routes';
import {deleteItem, storeData} from '../LocalStore';
import {userInfoSuccess} from '../reducer/UserReducer';

let getItem = state => state.AuthReducer;

/* Guest Login */
export function* guestLoginSaga(action) {
  try {
    yield call(storeData, constants.TOKEN, action.payload.token);
    yield call(
      storeData,
      constants.REFRESH_TOKEN,
      action.payload.refresh_token,
    );
    yield call(storeData, constants.USER_ID, action.payload.user_id);
    yield put(
      setUserToken({
        token: action.payload.token,
        user_id: action.payload.user_id,
        refresh_token: action.payload.refresh_token,
      }),
    );
    yield put(guestLoginSuccess({}));
    showErrorAlert('Login as a Guest Successful');
  } catch (error) {
    yield put(guestLoginFailure(error));
    console.error(error);
    showErrorAlert('Something went wrong');
  }
}

/* Login */
export function* loginSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, routes.LOGIN, action.payload, header);
    console.log('response -- ', response.data);
    if (response.status === 201) {
      yield call(storeData, constants.TOKEN, response.data.access_token);
      yield call(
        storeData,
        constants.REFRESH_TOKEN,
        response.data.refresh_token,
      );
      yield call(storeData, constants.USER_ID, response.data._id);
      yield put(
        setUserToken({
          token: response.data.access_token,
          user_id: response.data._id,
          refresh_token: response.data.refresh_token,
        }),
      );
      yield put(
        loginSuccess({
          data: response.data,
          token: response.data.access_token,
        }),
      );
      showErrorAlert('Login Successful');
    } else {
      yield put(loginFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    yield put(loginFailure(error));
    console.error(error);
    showErrorAlert('Something went wrong');
  }
}

/* SignUp */
export function* signupSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    console.log(action.payload);
    let response = yield call(postApi, routes.SIGNUP, action.payload, header);

    if (response.status === 201) {
      yield call(storeData, constants.TOKEN, response.data.access_token);
      yield call(
        storeData,
        constants.REFRESH_TOKEN,
        response.data.refresh_token,
      );
      yield call(storeData, constants.USER_ID, response.data._id);
      yield put(
        setUserToken({
          token: response.data.access_token,
          user_id: response.data._id,
          refresh_token: response.data.refresh_token,
        }),
      );
      yield put(signupSuccess(response.data));
      showErrorAlert('Login Successful');
    } else {
      yield put(signupFailure(response?.data?.message));
      console.log(response.data);
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    yield put(signupFailure(error));
    console.log(error);
    showErrorAlert('Something went wrong');
  }
}

/* Logout */
export function* logoutSaga() {
  try {
    yield call(deleteItem, constants.TOKEN);
    yield call(deleteItem, constants.USER_ID);
    yield call(deleteItem, constants.REFRESH_TOKEN);
    yield put(
      setUserToken({
        token: null,
        user_id: null,
        refresh_token: null,
      }),
    );
    yield put(userInfoSuccess({userDetails: {}}));
    yield put(logoutSuccess({}));
    showErrorAlert('Logout Successful');
  } catch (error) {
    console.log(error);
    yield put(logoutFailure(error));
    showErrorAlert('Logout Failed');
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Auth/guestLoginRequest', guestLoginSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/loginRequest', loginSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/signupRequest', signupSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/logoutRequest', logoutSaga);
  })(),
];

export default watchFunction;

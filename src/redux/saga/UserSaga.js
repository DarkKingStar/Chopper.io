import {call, put, select, takeLatest} from 'redux-saga/effects';
import {userInfoFailure, userInfoSuccess, userPlayListShowSuccess, userPlayListShowFailure,
  userPlayListAddSuccess, userPlayListAddFailure, userPlayListDeleteSuccess, userPlayListDeleteFailure
} from '../reducer/UserReducer';
import routes from '../../constants/routes';
import {getApi, postApi} from '../ApiRequest';

let getItem = state => state.AuthReducer;

export function* userInfoSaga() {
  try {
    const item = yield select(getItem);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      accesstoken: item?.token,
    };
    console.log(header);
    let response = yield call(getApi, routes.USERINFO, header);
    if (response.status == 200) {
      yield put(userInfoSuccess(response.data));
    } else {
      yield put(userInfoFailure(response.data));
    }
  } catch (error) {
    yield put(userInfoFailure(error));
  }
}

export function* userPlayListShowSaga() {
  try {
    const item = yield select(getItem);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      accesstoken: item?.token,
    };
    console.log(header);
    let response = yield call(getApi, routes.SHOWPLAYLIST, header);
    if (response.status == 200) {
      yield put(userPlayListShowSuccess(response.data));
    } else {
      yield put(userPlayListShowFailure(response.data));
    }
  } catch (error) {
    yield put(userPlayListShowFailure(error));
  }
}

export function* userPlayListAddSaga(action) {
  try {
    const item = yield select(getItem);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      accesstoken: item?.token,
    };
    console.log(header);
    let response = yield call(postApi, routes.ADDPLAYLIST, action?.payload, header);
    if (response.status == 200) {
      yield put(userPlayListAddSuccess(response.data));
    } else {
      yield put(userPlayListAddFailure(response.data));
    }
  } catch (error) {
    yield put(userPlayListAddFailure(error));
  }
}

export function* userPlayListDeleteSaga(action) {
  try {
    const item = yield select(getItem);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      accesstoken: item?.token,
    };
    console.log(header);
    let response = yield call(postApi, routes.DELETEPLAYLIST, action?.payload, header);
    if (response.status == 200) {
      yield put(userPlayListDeleteSuccess(response.data));
    } else {
      yield put(userPlayListDeleteFailure(response.data));
    }
  } catch (error) {
    yield put(userPlayListDeleteFailure(error));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('User/userInfoRequest', userInfoSaga);
  })(),
  (function* () {
    yield takeLatest('User/userPlayListShowRequest', userPlayListShowSaga);
  })(),
  (function* () {
    yield takeLatest('User/userPlayListAddRequest', userPlayListAddSaga);
  })(),
  (function* () {
    yield takeLatest('User/userPlayListDeleteRequest', userPlayListDeleteSaga);
  })(),
];

export default watchFunction;

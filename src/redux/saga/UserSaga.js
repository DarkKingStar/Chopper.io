import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  userInfoFailure,
  userInfoSuccess
} from "../reducer/UserReducer"
import routes from '../../constants/routes';
import { postApi } from '../ApiRequest';

let getItem = state => state.AuthReducer;


export function* userInfoSaga() {

  try {
    const item = yield select(getItem);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      accesstoken: item?.token,
    };
    let response = yield call(postApi, routes.USERINFO, {id: item?.user_id}, header);
    console.log('userInfo response -- ', response.data);
    if (response.status == false) {
      yield put(userInfoSuccess(response.data));
    }else{
      yield put(userInfoFailure(response.data));
    }
  } catch (error) {
    console.log('userInfo error -- ', error.response.status);
    yield put(userInfoFailure(error));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('User/userInfoRequest', userInfoSaga);
  })(),
];

export default watchFunction;

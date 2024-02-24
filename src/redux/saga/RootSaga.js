import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import UserSaga from './UserSaga';
import AnimeSaga from './AnimeSaga';

const combinedSaga = [
  ...AuthSaga,
  ...UserSaga,
  ...AnimeSaga
];

export default function* RootSaga() {
  yield all(combinedSaga);
}

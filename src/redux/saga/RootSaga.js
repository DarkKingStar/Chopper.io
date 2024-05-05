import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import UserSaga from './UserSaga';
import AnimeSaga from './AnimeSaga';
import TabSaga from './TabSaga';

const combinedSaga = [
  ...AuthSaga,
  ...UserSaga,
  ...AnimeSaga,
  ...TabSaga,
];

export default function* RootSaga() {
  yield all(combinedSaga);
}

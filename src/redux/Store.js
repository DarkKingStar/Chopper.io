import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import RootSaga from './saga/RootSaga';
import AnimeReducer from './reducer/AnimeReducer';
import AuthReducer from './reducer/AuthReducer';
import UserReducer from './reducer/UserReducer';
import TabReducer from './reducer/TabReducer';

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
// const middleware = [sagaMiddleware, logger];

export default configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    AnimeReducer: AnimeReducer,
    UserReducer: UserReducer,
    TabReducer: TabReducer,
  },
  middleware,
});

sagaMiddleware.run(RootSaga);

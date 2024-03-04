import {call, put, select, takeLatest} from 'redux-saga/effects';
import { getApi,getApiWithSignal } from '../ApiRequest';
import routes from '../../constants/routes';
import { 
  animeMoviesFailure,
  animeMoviesSuccess,
  popularAnimeFailure,
  popularAnimeSuccess,
  recentReleasedFailure,
  recentReleasedSuccess,
  newSeasonFailure,
  newSeasonSuccess,
  animeSearchFailure,
  animeSearchSuccess

} from '../reducer/AnimeReducer';


let getItem = state => state.AuthReducer;




export function* recentReleasedSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const  response = yield call(getApi, routes.RECENT_RELEASED + action?.payload?.page, header);
    if(response.status === 200){
      yield put(recentReleasedSuccess(response.data));
    }else{
      yield put(recentReleasedFailure(response.data));
    }
  } catch (error) {
    yield put(recentReleasedFailure(error));
  }
}

export function* newSeasonSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const  response = yield call(getApi, routes.NEW_SEASON  + action?.payload?.page, header);
    if(response.status === 200){
      yield put(newSeasonSuccess(response.data));
    }else{
      yield put(newSeasonFailure(response.data));
    }
  }catch(error){
    yield put(newSeasonFailure(error));
  }
}

export function* popularAnimeSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const  response = yield call(getApi, routes.POPULAR_ANIME + action?.payload?.page, header);
    if(response.status === 200){
      yield put(popularAnimeSuccess(response.data));
    }else{
      yield put(popularAnimeFailure(response.data));
    }
  }catch(error){
    yield put(popularAnimeFailure(error)); 
  }
}

export function* animeMoviesSaga(action) {
  try{
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const  response = yield call(getApi, routes.ANIME_MOVIES + action?.payload?.page, header);
    if(response.status === 200){
      yield put(animeMoviesSuccess(response.data));
    }else{
      yield put(animeMoviesFailure(response.data));
    }
  }catch(error){
    yield put(animeMoviesFailure(error));
  }
}


export function* animeSearchSaga(action) {
  try{
    console.log("action",action)
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    }
    const response = yield call(getApiWithSignal, routes.ANIME_SEARCH + action?.payload.data , header);
    if(response.status === 200){
      yield put(animeSearchSuccess(response.data));
    }else{
      yield put(animeSearchFailure(response.data));
    }
  }catch(error){
    yield put(animeSearchFailure(error));
  }
}


const watchFunction = [
  (function* () {
    yield takeLatest('Anime/recentReleasedRequest', recentReleasedSaga);
  })(),
  (function* () {
    yield takeLatest('Anime/newSeasonRequest', newSeasonSaga);
  })(),
  (function* () {
    yield takeLatest('Anime/popularAnimeRequest', popularAnimeSaga);
  })(),
  (function* () {
    yield takeLatest('Anime/animeMoviesRequest', animeMoviesSaga);
  })(),
  (function* () {
    yield takeLatest('Anime/animeSearchRequest', animeSearchSaga);
  })(),
];

export default watchFunction;

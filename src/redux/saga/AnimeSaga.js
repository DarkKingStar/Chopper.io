import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi, getApiWithSignal} from '../ApiRequest';
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
  animeSearchSuccess,
  animeDetailsSuccess,
  animeDetailsFailure,
  animeEpisodesSuccess,
  animeEpisodesFailure,
  getGenreListSuccess,
  getGenreListFailure,
  getGenreAnimeSuccess,
  getGenreAnimeFailure,
} from '../reducer/AnimeReducer';

let getItem = state => state.AuthReducer;

export function* recentReleasedSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const response = yield call(
      getApi,
      routes.RECENT_RELEASED + action?.payload?.page,
      header,
    );
    if (response.status === 200) {
      yield put(recentReleasedSuccess(response.data));
    } else {
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
    const response = yield call(
      getApi,
      routes.NEW_SEASON + action?.payload?.page,
      header,
    );
    if (response.status === 200) {
      yield put(newSeasonSuccess(response.data));
    } else {
      yield put(newSeasonFailure(response.data));
    }
  } catch (error) {
    yield put(newSeasonFailure(error));
  }
}

export function* popularAnimeSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const response = yield call(
      getApi,
      routes.POPULAR_ANIME + action?.payload?.page,
      header,
    );
    if (response.status === 200) {
      yield put(popularAnimeSuccess(response.data));
    } else {
      yield put(popularAnimeFailure(response.data));
    }
  } catch (error) {
    yield put(popularAnimeFailure(error));
  }
}

export function* animeMoviesSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const response = yield call(
      getApi,
      routes.ANIME_MOVIES + action?.payload?.page,
      header,
    );
    if (response.status === 200) {
      yield put(animeMoviesSuccess(response.data));
    } else {
      yield put(animeMoviesFailure(response.data));
    }
  } catch (error) {
    yield put(animeMoviesFailure(error));
  }
}

export function* animeSearchSaga(action) {
  try {
    console.log('action', action);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const response = yield call(
      getApiWithSignal,
      routes.ANIME_SEARCH + action?.payload.data,
      header,
    );
    if (response.status === 200) {
      yield put(animeSearchSuccess(response.data));
    } else {
      yield put(animeSearchFailure(response.data));
    }
  } catch (error) {
    yield put(animeSearchFailure(error));
  }
}

export function* animeDetailsSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const response = yield call(
      getApi,
      routes.ANIME_DETAILS + action?.payload?.id,
      header,
    );
    if (response.status === 200) {
      yield put(animeDetailsSuccess(response.data));
    } else {
      yield put(animeDetailsFailure(response.data));
    }
  } catch (error) {
    yield put(animeDetailsFailure(error));
  }
}

export function* animeEpisodesSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    let {animeid, page, rows, id} = action?.payload;
    const response = yield call(
      getApi,
      routes.ANIME_EPISODES +
        animeid +
        '?page=' +
        page +
        '&rows=' +
        rows +
        '&id=' +
        id,
      header,
    );
    if (response.status === 200) {
      yield put(animeEpisodesSuccess(response.data));
    } else {
      yield put(animeEpisodesFailure(response.data));
    }
  } catch (error) {
    yield put(animeEpisodesFailure(error));
  }
}

export function* getGenreListSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const response = yield call(getApi, routes.GENRELIST, header);
    if (response.status === 200) {
      yield put(getGenreListSuccess(response.data));
    } else {
      yield put(getGenreListFailure(response.data));
    }
  } catch (error) {
    yield put(getGenreListFailure(error));
  }
}

export function* getGenreAnimeSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    const response = yield call(
      getApi,
      routes.GENREANIMES +
        action?.payload?.genre +
        '?page=' +
        action?.payload?.page,
      header,
    );
    if (response.status === 200) {
      yield put(getGenreAnimeSuccess(response.data));
    } else {
      yield put(getGenreAnimeFailure(response.data));
    }
  } catch (error) {
    yield put(getGenreAnimeFailure(error));
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
  (function* () {
    yield takeLatest('Anime/animeDetailsRequest', animeDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Anime/animeEpisodesRequest', animeEpisodesSaga);
  })(),
  (function* () {
    yield takeLatest('Anime/getGenreListRequest', getGenreListSaga);
  })(),
  (function* () {
    yield takeLatest('Anime/getGenreAnimeRequest', getGenreAnimeSaga);
  })(),
];

export default watchFunction;

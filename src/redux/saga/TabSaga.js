import {call, put, select, takeLatest} from 'redux-saga/effects';
import routes from '../../constants/routes';
import {getApi} from '../ApiRequest';
import {
  getCurrentEpisodeListSuccess,
  getCurrentEpisodeListFailure,
  getCurrentEpisoodeDetailsSuccess,
  getCurrentEpisoodeDetailsFailure,
} from '../reducer/TabReducer';


function* getCurrentEpisodeListSaga(action) {
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
        if (response.status == 200) {
            yield put(getCurrentEpisodeListSuccess(response.data));
        } else {
            yield put(getCurrentEpisodeListFailure(response.data));
        }
    } catch (error) {
        yield put(getCurrentEpisodeListFailure(error));
    }
}

function* getCurrentEpisoodeDetailsSaga(action) {
    try {
        let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        };
        let {id} = action?.payload;
        const response = yield call(
        getApi,
        routes.ANIME_STREAM + id,
        header,
        );
        if (response.status == 200) {
            yield put(getCurrentEpisoodeDetailsSuccess(response.data));
        } else {
            yield put(getCurrentEpisoodeDetailsFailure(response.data));
        }
    } catch (error) {
        yield put(getCurrentEpisoodeDetailsFailure(error));
    }
}




const watchFunction = [
  (function* () {
    yield takeLatest(
      'Tab/getCurrentEpisodeListRequest',
      getCurrentEpisodeListSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Tab/getCurrentEpisoodeDetailsRequest',
      getCurrentEpisoodeDetailsSaga,
    );
  })(),
];

export default watchFunction;

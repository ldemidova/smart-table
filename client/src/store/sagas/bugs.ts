import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_BUGS, API_BUGS } from '../constants';
import { setBugs } from '../actions';
import axios from 'axios';
import { BugsAction, BugsState } from '../../types';

export function* watcherSetBugsSaga() {
  yield takeLatest(GET_BUGS, workerSetBugsSaga);
}


function fetchBugs(params: BugsState) {
  const url = `${API_BUGS}?${Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&')}`;

  return axios({
    method: "get",
    url
  });
}

function* workerSetBugsSaga(action: BugsAction) {
  try {
    const response = yield call(fetchBugs, { ...action.payload });
    const { page, pageSize, results: list, total, searchBy } = response.data;

    yield put(setBugs({
      page,
      pageSize,
      list,
      total,
      searchBy
    }));

  } catch (error) {
    console.log(error);
  }
}

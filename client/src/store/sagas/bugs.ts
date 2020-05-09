import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_BUGS, API_BUGS } from '../constants';
import { setBugs } from '../actions';
import axios from 'axios';

export function* watcherSetBugsSaga() {
  yield takeLatest(GET_BUGS, workerSetBugsSaga);
}

function fetchBugs() {
  return axios({
    method: "get",
    url: API_BUGS
  });
}

function* workerSetBugsSaga() {
  try {
    const response = yield call(fetchBugs);
    const bugs = response.data.results;

    yield put(setBugs(bugs));

  } catch (error) {
    console.log('error');
  }
}

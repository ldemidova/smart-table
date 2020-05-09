import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_USERS, API_USERS } from '../../constants';
import { setUsers } from '../actions';
import axios from 'axios';

export function* watcherSetUsersSaga() {
  yield takeLatest(GET_USERS, workerSetUsersSaga);
}

function fetchUsers() {
  return axios({
    method: "get",
    url: API_USERS
  });
}

function* workerSetUsersSaga() {
  try {
    const response = yield call(fetchUsers);
    const users = response.data.results;

    yield put(setUsers(users));

  } catch (error) {
    console.log('error');
  }
}

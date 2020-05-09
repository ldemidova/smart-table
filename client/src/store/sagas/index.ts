import { fork } from 'redux-saga/effects';
import { watcherSetUsersSaga } from './users';
import { watcherSetBugsSaga } from './bugs';

function * rootSaga () {
  yield fork(watcherSetUsersSaga)
  yield fork(watcherSetBugsSaga)
}

export { rootSaga };

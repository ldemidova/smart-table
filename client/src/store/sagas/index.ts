import { fork } from 'redux-saga/effects'
import { watcherSetUsersSaga } from './users'

function * rootSaga () {
  yield fork(watcherSetUsersSaga)
}

export { rootSaga };

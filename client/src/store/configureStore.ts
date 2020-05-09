import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import { users } from './reducers';
import { rootSaga } from './sagas';

function configureStore () {
  const sagaMiddleWare = createSagaMiddleware()

  const middlewares = [applyMiddleware(sagaMiddleWare)]

  const reducers = combineReducers({
    users
  })

  const store = createStore(
    reducers,
    compose(
      ...middlewares
    )
  )

  sagaMiddleWare.run(rootSaga);

  return store;
}

export { configureStore };

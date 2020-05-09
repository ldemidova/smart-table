import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import { users, bugs } from './reducers';
import { rootSaga } from './sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

function configureStore () {
  const sagaMiddleWare = createSagaMiddleware()

  const middlewares = [applyMiddleware(sagaMiddleWare)]

  const reducers = combineReducers({
    users,
    bugs
  })

  const isDevelopement = process.env.NODE_ENV === 'development';

  let composeEnhancers = isDevelopement && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] : compose;

  const store = createStore(
    reducers,
    composeEnhancers(
      ...middlewares
    )
  )

  if (module.hot && isDevelopement) {
    module.hot.accept([
      './reducers'
    ], () => store.replaceReducer(reducers))
  }

  sagaMiddleWare.run(rootSaga);

  return store;
}

export { configureStore };

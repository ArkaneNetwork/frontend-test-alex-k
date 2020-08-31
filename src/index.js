import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import rootSaga from './sagas';
import AppRouter from './router';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const history = createBrowserHistory();

const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const store = createStore(
    reducers(history),
    compose(
        applyMiddleware(routerMiddleware(history), ...middlewares),
        ...enhancers,
    ),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRouter />
      </ConnectedRouter>
    </Provider>, document.getElementById('root'),
);

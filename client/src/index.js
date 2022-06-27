import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import Reducers from './reducers';
import App from './components/App';

const root = createRoot(document.getElementById('root'));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  Reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

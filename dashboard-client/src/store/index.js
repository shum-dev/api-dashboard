import rootReducer from './reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk),
    )
  );
  return store;
}
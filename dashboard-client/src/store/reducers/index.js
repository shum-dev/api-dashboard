import { combineReducers } from 'redux';
import currentAdmin from './admin';
import errors from './errors';
import users from './users';
import cards from './cards';

const rootReducer = combineReducers({
  currentAdmin,
  errors,
  users,
  cards
});

export default rootReducer;

import { SET_CURRENT_ADMIN } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  admin: {}
}

export default (state=DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_CURRENT_ADMIN:
      return {
        isAuthenticated: !!Object.keys(action.admin).length,
        admin: action.admin
      }
    default:
      return state;
  }
}
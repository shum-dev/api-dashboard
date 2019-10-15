import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_ADMIN } from '../actionTypes';
import { addError, removeError} from './errors';

export function setCurrentAdmin(admin) {
  return {
    type: SET_CURRENT_ADMIN,
    admin
  }
}

export function logOut() {
  return dispatch => {
    window.localStorage.clear();
    setTokenHeader(false);
    dispatch(setCurrentAdmin({}));
  }
}

export function authAdmin(type, adminData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      apiCall('post', `/api/auth/${type}`, adminData)
      .then(({token, ...admin}) => {
        window.localStorage.setItem('jwtToken', token);
        setTokenHeader(token);
        dispatch(setCurrentAdmin(admin));
        dispatch(removeError());
        resolve()
      })
      .catch(err => {
        dispatch(addError(err.message));
      })
    })
  }
}




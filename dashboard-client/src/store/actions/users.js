import { ADD_USER, SET_ACTIVE_USER, SET_USERS_LIST, UPDATE_USER } from '../actionTypes';

export function createNewUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}

export function setActiveUser(user) {
  return {
    type: SET_ACTIVE_USER,
    user
  }
}

export function setUsersList(usersList) {
  return {
    type: SET_USERS_LIST,
    usersList
  }
}
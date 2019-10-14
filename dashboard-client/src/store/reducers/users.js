import { ADD_USER, SET_ACTIVE_USER, SET_USERS_LIST, UPDATE_USER } from '../actionTypes';


const defState = {
  activeUser: null,
  usersList: []
}

export default (state=defState, action) => {
  switch(action.type) {
    case ADD_USER:
      return {
        ...state,
        usersList: [...state.usersList, action.user]
      }
    case SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.user
      }
    case SET_USERS_LIST:
      return {
        ...state,
        usersList: action.usersList
      }
    case UPDATE_USER:
      let filteredList = state.usersList.filter(user => user.id !== action.user.id);
      return {
        ...state,
        usersList: [...filteredList, action.user]
      }
    default:
      return state;
  }
}
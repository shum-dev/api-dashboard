import { SET_CARDS_LIST } from '../actionTypes';
import { getRendomCards} from '../actions/cards';

let defaultState = getRendomCards();

export default (state=defaultState, action) => {
  switch(action.type) {
    case SET_CARDS_LIST:
      return action.cards;
    default:
      return state;
  }
}
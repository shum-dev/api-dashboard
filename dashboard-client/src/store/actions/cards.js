import { SET_CARDS_LIST } from '../actionTypes';
import seedCards from '../../seedCards';

export const getRendomCards = () => {
  let count = 0;
  let randomCards = [];
  let singleCard;
  while(count < 4) {
    singleCard = seedCards[Math.floor(Math.random()*seedCards.length)]
    if(!randomCards.includes(singleCard)){
      randomCards.push(singleCard);
      count++
    }
  }
  return randomCards;
}

export function setRandomCardsList() {
  let cards = getRendomCards();
  return {
    type: SET_CARDS_LIST,
    cards
  }
}


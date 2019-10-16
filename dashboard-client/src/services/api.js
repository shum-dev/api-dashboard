import axios from 'axios';
import seedCards from '../seedCards';

export function setTokenHeader(token) {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    axios[method](path, data)
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err.response.data.error);
    });
  })
}

export function fetchCardData(cardId) {
  let foundCard = seedCards.filter(item => item.id === cardId)[0];
  return new Promise((resolve, reject) => {
    apiCall('get', foundCard.Endpoint)
    .then(res => {
      let apiData;
      if(foundCard.Path) {
        apiData = res[foundCard.Path]
      } else {
        apiData = res;
      }
      resolve(apiData);
    })
    .catch(err => {
      reject(err);
    })
  })
}
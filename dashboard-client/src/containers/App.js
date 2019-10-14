import React from 'react';
import OptionsBar from './OptionsBar';
import Main from './Main';

import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router} from 'react-router-dom';
import { setCurrentAdmin } from '../store/actions/admin';
import { setUsersList } from '../store/actions/users';
import { setTokenHeader } from '../services/api';
import jwtDecode from 'jwt-decode';


const store = configureStore();

if(localStorage.jwtToken) {
  setTokenHeader(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentAdmin(jwtDecode(localStorage.jwtToken)));
    store.dispatch(setUsersList(JSON.parse(localStorage.usersList)))
  } catch (err) {
    console.log('Cant restore state from localStorage');
    store.dispatch(setCurrentAdmin({}));
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <OptionsBar/>
          <Main/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';

import '../styles/Homepage.css';

const Homepage = ({ currentAdmin }) => {
  if(!currentAdmin.isAuthenticated) {
    return (
      <div className='Homepage'>
        <div className="Homepage-text">
          <h1>Hi there!</h1>
          <h5>New to Dashboard?</h5>
          <Link to="/signup" className="btn btn-danger">
            Sign up here!
          </Link>
          <h5>Alredy have an account?</h5>
          <Link to="/signin" className="btn btn-primary">
            Log in
          </Link> 
          <br/>
          <small>Quick Access: test</small>
          <br/>
          <small>Password: test</small>
        </div>
      </div>
    )
  }
  return <Dashboard />
}


export default Homepage;
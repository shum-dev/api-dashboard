import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import AddUserForm from './AddUserForm';
import CardPage from './CardPage';
import { authAdmin } from '../store/actions/admin';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';


// TODO: Last resort

import '../styles/Main.css';

const Main = ({ authAdmin, currentAdmin, removeError, errors }) => {
  return(
    <div className='Main-container'>
      <Switch>
        <Route
          exact
          path='/'
          render={ routerProps => <Homepage {...routerProps} currentAdmin={currentAdmin}/>}
        />
        <Route
          exact
          path='/signin'
          render={ routerProps => {
            return <AuthForm
                      {...routerProps}
                      authAdmin={authAdmin}
                      heading='Welcome Back!'
                      buttonText='Log in'
                      errors={errors}
                      removeError={removeError}
                     />
          }}
        />
        <Route
          exact
          path='/signup'
          render={ routerProps => {
            return <AuthForm
                    {...routerProps}
                    authAdmin={authAdmin}
                    heading='Join Dashboard!'
                    buttonText='Sign me up!'
                    errors={errors}
                    removeError={removeError}
                    />
          }}
        />
        <Route exact path='/options' component={withAuth(AddUserForm)} />
        <Route exact path='/cards/:cardId' component={withAuth(CardPage)} />
        <Route render={() => <h1>Not Found!</h1>} />
      </Switch>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    currentAdmin: reduxState.currentAdmin,
    errors: reduxState.errors
  };
};

export default withRouter(connect(mapStateToProps, { authAdmin, removeError })(Main));
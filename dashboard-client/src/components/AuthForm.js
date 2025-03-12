import React, { useEffect } from 'react';
import useInputeState from '../hooks/useInputState';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Alert } from 'reactstrap';

import '../styles/AuthForm.css';

export default (props) => {
  let initialState = {adminName: '', password: ''};

  const [state, , updateState ] = useInputeState(initialState);
  
  useEffect(() => {
    const { history, removeError } = props;
    history.listen(() => {
      removeError();
    })
  }, [props]);
  
  const handleSubmit = e => {
    e.preventDefault();

    const { adminName, password } = state

    const authType = props.location.pathname.slice(1);
    
    props.authAdmin(authType, { adminName, password })
      .then(() => {
        props.history.push('/');
      })
      .catch(ignore => {});
  }

  const { heading, buttonText, errors} = props;

  return (
    <div className='AuthForm'>
      <Form onSubmit={handleSubmit}>
        <h2>{heading}</h2>
        {
          errors.message && (
            <Alert color="danger">
              {errors.message}
            </Alert>
          )
        }
        <FormGroup>
          <Label for="adminName">Name</Label>
          <Input
            type="text"
            name="adminName"
            id="adminName"
            placeholder="Enter your name"
            onChange={updateState}
            value={state.adminName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={updateState}
            value={state.password}
          />
        </FormGroup>
        <Button
          disabled={ state.adminName && state.password ? false : true}
        >
          {buttonText}
        </Button>
      </Form>
    </div>
  );
}
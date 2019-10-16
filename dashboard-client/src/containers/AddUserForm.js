import React, { useEffect } from 'react';
import useInputeState from '../hooks/useInputState';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { createNewUser, setActiveUser, updateUser } from '../store/actions/users';
import uuid from 'uuid/v4';

import '../styles/AddUserForm.css'

const AddUserForm = (props) => {
  let initialState = {
    fname: '',
    lname: '',
    email: '',
    bio: '',
    gender: '',
    id: ''
  }
  const [state, setState, updateState, resetState] = useInputeState(initialState);

  useEffect(() => {
    if(props.activeUser){
      const {fname, lname, email, bio, gender, id} = props.activeUser;
      setState({fname, lname, email, bio, gender, id});
    }
  }, [props.activeUser, setState]);

  const createNewUser = e => {
    const {fname, lname, email, bio, gender} = state;
    e.preventDefault();
    props.createNewUser({fname, lname, email, bio, gender, id: uuid()});
    props.setActiveUser(null);
    resetState();
  }
  const editCurrentUser = e => {
    const {fname, lname, email, bio, gender, id} = state;
    e.preventDefault();
    props.updateUser({fname, lname, email, bio, gender, id});
    props.setActiveUser(null);
    resetState();
  }
  const {fname, lname, email, bio, gender, id} = state;
  return (
    <div className='AddUserForm-container'>
      <Form className='AddUserForm'>
        <FormGroup>
          <Label for="fname">First Name</Label>
          <Input type="text" name="fname" id="fname" value={fname} onChange={updateState}/>
        </FormGroup>
        <FormGroup>
          <Label for="lname">Last Name</Label>
          <Input type="text" name="lname" id="lname" value={lname} onChange={updateState}/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={email} onChange={updateState}/>
        </FormGroup>
        <FormGroup>
          <Label for="bio">Bio</Label>
          <Input type="textarea" name="bio" id="bio" value={bio} onChange={updateState} />
        </FormGroup>
        <FormGroup tag="fieldset">
          <Label>Gender</Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="gender"
                value='male'
                onChange={updateState}
                checked={gender === 'male' ? true : false} />
              Male
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="gender"
                value='female'
                onChange={updateState}
                checked={gender === 'female' ? true : false}
              />
              Female
            </Label>
          </FormGroup>
        </FormGroup>
        <Button
          onClick={createNewUser}
          disabled={fname && lname && email && bio && gender ? false : true}
        >
          Create New
        </Button>
        <Button
          onClick={editCurrentUser}
          disabled={id ? false : true}
        >
            Edit Current</Button>
      </Form>
    </div>
  );
}

function mapStateToProps(reduxState) {
  return {
    currentAdmin: reduxState.currentAdmin,
    errors: reduxState.errors,
    activeUser: reduxState.users.activeUser
  };
};

export default connect(mapStateToProps, { createNewUser, setActiveUser, updateUser })(AddUserForm);
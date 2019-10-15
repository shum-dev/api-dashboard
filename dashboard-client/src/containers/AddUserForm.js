import React, { useEffect } from 'react';
import useInputeState from '../hooks/useInputState';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { createNewUser, setActiveUser, updateUser } from '../store/actions/users';
import uuid from 'uuid/v4';

import '../styles/AddUserForm.css'

const AddUserForm = (props) => {
  const initState = (key) => {
    return props.activeUser ? props.activeUser[key] : '';
  }
  const [fname, setFname, updateFname, resetFname] = useInputeState(initState('fname'));
  const [lname, setlname, updateLname, resetLname] = useInputeState(initState('lname'));
  const [email, setEmail, updateEmail, resetEmail] = useInputeState(initState('email'));
  const [bio, setBio, updateBio, resetBio] = useInputeState(initState('bio'));
  const [gender, setGender, updateGender, resetGender] = useInputeState(initState('gender'));
  const [id, setId, , resetId] = useInputeState(initState('id'));

  useEffect(() => {
    if(props.activeUser){
      let {fname, lname, email, bio, gender, id} = props.activeUser;
      setFname(fname);
      setlname(lname);
      setEmail(email);
      setBio(bio);
      setGender(gender);
      setId(id);
    }
  }, [props.activeUser, setFname, setlname, setEmail, setBio, setGender, setId]);

  const createNewUser = e => {
    e.preventDefault();
    props.createNewUser({fname, lname, email, bio, gender, id: uuid()});
    props.setActiveUser(null);
    resetSate();
  }
  const editCurrentUser = e => {
    e.preventDefault();
    props.updateUser({fname, lname, email, bio, gender, id});
    props.setActiveUser(null);
    resetSate();
  }
  const resetSate = () => {
    resetFname();
    resetLname();
    resetEmail();
    resetBio();
    resetGender();
    resetId();
  }
  return (
    <div className='AddUserForm-container'>
      <Form className='AddUserForm'>
        <FormGroup>
          <Label for="fname">First Name</Label>
          <Input type="text" name="fname" id="fname" value={fname} onChange={updateFname}/>
        </FormGroup>
        <FormGroup>
          <Label for="lname">Last Name</Label>
          <Input type="text" name="lname" id="lname" value={lname} onChange={updateLname}/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={email} onChange={updateEmail}/>
        </FormGroup>
        <FormGroup>
          <Label for="bio">Bio</Label>
          <Input type="textarea" name="bio" id="bio" value={bio} onChange={updateBio} />
        </FormGroup>
        <FormGroup tag="fieldset">
          <Label>Gender</Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="gender"
                value='male'
                onChange={updateGender}
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
                onChange={updateGender}
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
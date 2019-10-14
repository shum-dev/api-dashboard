import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { createNewUser, setActiveUser, updateUser } from '../store/actions/users';
import uuid from 'uuid/v4';

import '../styles/AddUserForm.css'

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.props.activeUser
    ? this.state = {...this.props.activeUser}
    : this.state = {
        fname: '',
        lname: '',
        email: '',
        bio: '',
        gender: '',
        id: ''
    }
  }
  componentDidUpdate(prevProps, prevState){
    const { activeUser } = this.props;
    if( activeUser && prevProps.activeUser !== activeUser) {
      let {fname, lname, email, bio, gender, id} = activeUser;
      this.setState({
        fname,
        lname,
        email,
        bio,
        gender,
        id
      });
     }
  }
  createNew = e => {
    e.preventDefault();
    this.props.createNewUser({...this.state, id: uuid()});
    this.props.setActiveUser(null);
    this.setState({
      fname: '',
      lname: '',
      email: '',
      bio: '',
      gender: '',
      id: ''
    });
  }
  editCurrentUser = e => {
    e.preventDefault();
    this.props.updateUser(this.state);
    this.props.setActiveUser(null);
    this.setState({
      fname: '',
      lname: '',
      email: '',
      bio: '',
      gender: '',
      id: ''
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    var {fname, lname, email, bio, gender} = this.state;
    return (
      <div className='AddUserForm-container'>
        <Form className='AddUserForm'>
          <FormGroup>
            <Label for="fname">First Name</Label>
            <Input type="text" name="fname" id="fname" value={fname} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="lname">Last Name</Label>
            <Input type="text" name="lname" id="lname" value={lname} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={email} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="bio">Bio</Label>
            <Input type="textarea" name="bio" id="bio" value={bio} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup tag="fieldset">
            <Label>Gender</Label>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="gender"
                  value='male'
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  checked={gender === 'female' ? true : false}
                />
                Female
              </Label>
            </FormGroup>
          </FormGroup>
          <Button
            onClick={this.createNew}
            disabled={fname && lname && email && bio && gender ? false : true}
          >
            Create New
          </Button>
          <Button
            onClick={this.editCurrentUser}
            disabled={this.state.id ? false : true}
          >
              Edit Current</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentAdmin: reduxState.currentAdmin,
    errors: reduxState.errors,
    activeUser: reduxState.users.activeUser
  };
};

export default connect(mapStateToProps, { createNewUser, setActiveUser, updateUser })(AddUserForm);
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Alert } from 'reactstrap';

import '../styles/AuthForm.css';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminName: '',
      password: '',
    };
  }
  componentDidMount(){
    const { history, removeError } = this.props;
    history.listen(() => {
      removeError();
    })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.location.pathname.slice(1);
    this.props.authAdmin(authType, this.state)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(ignore => {});
  }
  render() {
    const { adminName, password } = this.state;
    const { heading, buttonText, errors} = this.props;
    return (
      <div className='AuthForm'>
        <Form onSubmit={this.handleSubmit}>
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
              onChange={this.handleChange}
              value={adminName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={this.handleChange}
              value={password}
            />
          </FormGroup>
          <Button
            disabled={ adminName && password ? false : true}
          >
            {buttonText}
          </Button>
        </Form>
      </div>
    );
  }
}
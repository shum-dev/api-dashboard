import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../store/actions/admin';
import { setRandomCardsList } from '../store/actions/cards';
import { setActiveUser, setUsersList } from '../store/actions/users';
import { withRouter, NavLink as RouterNavLink } from 'react-router-dom';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
        NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
        DropdownMenu, DropdownItem, Button } from 'reactstrap';

import '../styles/OptionsBar.css';

class OptionsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { usersList } = this.props.users;
    if( prevProps.users.usersList !== usersList) {
      window.localStorage.setItem('usersList', JSON.stringify(usersList));
    }
  }
  logOut = e => {
    e.preventDefault();
    this.props.setUsersList([]);
    this.props.setActiveUser(null)
    this.props.logOut();
    this.props.history.push('/');
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleClick = item => {
    this.props.setActiveUser(item);
    this.props.setRandomCardsList();
    this.setState({
      isOpen: false
    })
  }
  render() {
    const { currentAdmin, users } = this.props;
    const usersList = users.usersList.map(item => (
        <DropdownItem
          className={users.activeUser && item.id === users.activeUser.id ? 'active' : null}
          key={item.id}
          onClick={this.handleClick.bind(this, item)}
        >
          {item.lname}
        </DropdownItem>
    ));
    return(
      <div className='OptionsBar'>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href='/'>Dashboard</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <NavItem>
                <NavLink>{currentAdmin.isAuthenticated && currentAdmin.admin.adminName}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar >
                <DropdownToggle nav caret>
                  Users
                </DropdownToggle>
                <DropdownMenu right>
                  {usersList}
                </DropdownMenu>
              </UncontrolledDropdown>
              { currentAdmin.isAuthenticated && (
                  <NavItem>
                    <Button color="secondary" size="sm" onClick={this.logOut}>LogOut</Button>
                  </NavItem>
                )
              }
            </Nav>
          </Collapse>
        </Navbar>
        {currentAdmin.isAuthenticated && (
          <Nav>
            <NavItem>
              <RouterNavLink exact to="/">Dashboard</RouterNavLink>
            </NavItem>
            <NavItem>
              <RouterNavLink exact to="/Options">Options page</RouterNavLink>
            </NavItem>
          </Nav>
        )}

    </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    currentAdmin: reduxState.currentAdmin,
    users: reduxState.users
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    {logOut, setActiveUser, setUsersList, setRandomCardsList }
  )(OptionsBar)
);
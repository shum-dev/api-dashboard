import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../store/actions/admin';
import { setRandomCardsList } from '../store/actions/cards';
import { setActiveUser, setUsersList } from '../store/actions/users';
import { withRouter, NavLink as RouterNavLink } from 'react-router-dom';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
        NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
        DropdownMenu, DropdownItem, Button } from 'reactstrap';

import '../styles/OptionsBar.css';

const OptionsBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    window.localStorage.setItem('usersList', JSON.stringify(props.users.usersList));
  }, [props.users.usersList]);
  const logOut = e => {
    e.preventDefault();
    props.setUsersList([]);
    props.setActiveUser(null)
    props.logOut();
    props.history.push('/');
  }
  const handleClick = item => {
    props.setActiveUser(item);
    props.setRandomCardsList();
    setIsOpen(false);
  }
  const { currentAdmin, users } = props;
  return (
    <div className='OptionsBar'>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href='/'>Dashboard</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>{currentAdmin.isAuthenticated && currentAdmin.admin.adminName}</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar >
              <DropdownToggle nav caret>
                Users
              </DropdownToggle>
              <DropdownMenu right>
                {props.users.usersList.map(item => (
                    <DropdownItem
                      className={users.activeUser && item.id === users.activeUser.id ? 'active' : null}
                      key={item.id}
                      onClick={handleClick.bind(this, item)}
                    >
                      {item.lname}
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </UncontrolledDropdown>
            { currentAdmin.isAuthenticated && (
                <NavItem>
                  <Button color="secondary" size="sm" onClick={logOut}>LogOut</Button>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    componentDidMount() {
      if(this.props.isAuthenticated === false) {
        this.props.history.push('/');
      }
    }
    componentDidUpdate(nextProps) {
      if(nextProps.isAuthenticated === false) {
        this.props.history.push('/');
      }
    }
    render() {
      return <ComponentToBeRendered {...this.props} />
    }
  }

  function mapStateToProps(reduxState) {
    return {
      isAuthenticated: reduxState.currentAdmin.isAuthenticated
    };
  }
  return connect(mapStateToProps, null)(Authenticate);
}
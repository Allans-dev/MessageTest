import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  renderLinks() {
    const { authenticated } = this.props;
    const { socket } = this.props;
    console.log(authenticated);
    console.log(socket);
    if (authenticated) {
      // shows link to sign out
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      );
    }
    // shows link to sign in or sign up
    return [
      <li className="nav-item">
        <Link className="nav-link" to="/signin">Sign In</Link>
      </li>,
      <li className="nav-item">
        <Link className="nav-link" to="signup">Sign Up</Link>
      </li>,
    ];
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Messaging App test</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    socket: state.socket,
  };
}

export default connect(mapStateToProps)(Header);

/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { subscribeToTimer, messageRelay, messageDisplay } from '../api';
// import { toggleSocket } from '../api';

// Styling

const formStyle = {
  background: '#000',
  padding: '3px',
  position: 'fixed',
  bottom: '0',
  width: '75%',
};

const inputStyle = {
  border: '0',
  padding: '10px',
  width: '90%',
  marginRight: '.5%',
};

const submitStyle = {
  width: '9%',
  background: 'rgb(130, 224, 255)',
  border: 'none',
  padding: '10px',
};

const messagesStyle = {
  listStyleType: 'none',
  margin: '0',
  padding: '0',
};

// Component

class Feature extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      message: '',
      timestamp: 'no timestamp yet',
    };
  }

  componentWillMount() {
    // fetch('http://localhost:3090', {
    //   headers: { authorization: sessionStorage.getItem('token') },
    // });
    const { socket } = this.state;
    const { message } = this.state;
    if (!{ socket }) {
      actions.openSocketInstance();
    }
    messageDisplay();
    subscribeToTimer((err, timestamp) => this.setState({
      timestamp,
    }));
  }

  componentWillUnmount() {
    console.log('unmount called');
    actions.closeSocketInstance();
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    const { message } = this.state;
    messageRelay({ message });
    this.setState({ message: '' });
    event.preventDefault();
  }

  render() {
    const { timestamp } = this.state;
    const { message } = this.state;
    return (
      <div>
        <div>
          { timestamp }
        </div>
        <ul id="messages" style={messagesStyle} />
        <form onSubmit={this.handleSubmit} style={formStyle}>
          <input
            type="text"
            name="chat message"
            id="m"
            value={message}
            onChange={this.handleChange}
            autoComplete="off"
            style={inputStyle}
          />
          <input type="submit" value="submit" style={submitStyle} />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    socket: state.socket,
  };
}

export default connect(mapStateToProps, actions)(Feature);

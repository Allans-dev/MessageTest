import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

// import MessageDisplay from './messageDisplay';

import io from 'socket.io-client';

class Feature extends Component {
    constructor(props){
        super(props);
        this.state = { message: '' }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        this.props.fetchMessage();
    }

    componentDidMount() {
    }

    handleChange(event) {
        this.setState({message: event.target.value});
      }
    
    handleSubmit(event) {

        const socket = io();

        socket.emit('chat message', this.state.message);
        
        this.setState({message: ''});
        // return false
        //      socket.on('chat message', function(msg){
        //          $('#messages').append($('<li>').text(msg));
        //      });

        // convert jquery to react
        // onSubmit use socket.io to pop to another area of the page on all users
        
        // $(function () {
        //     const socket = io();
        //      $('form').submit(function(){
        //          socket.emit('chat message', $('#m').val());
        //          $('#m').val('');
        //          return false;
        //      });
        //      socket.on('chat message', function(msg){
        //          $('#messages').append($('<li>').text(msg));
        //      });
        //  });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div>{this.props.message}</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="chat message" value={this.state.message} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="submit" />
                </form> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);
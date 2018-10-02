import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

// import MessageDisplay from './messageDisplay';
import { subscribeToTimer } from '../api';

// import io from 'socket.io-client';

// Styling

const formStyle = {
    background: '#000',
    padding: '3px',
    position: 'fixed',
    bottom: '0',
    width: '100%'
}

const inputStyle = {
    border: '0',
    padding: '10px',
    width: '90%', 
    marginRight: '.5%'
}

const submitStyle = {
    width: '9%',
    background: 'rgb(130, 224, 255)',
    border: 'none',
    padding: '10px'
}

const messagesStyle = {
    listStyleType: 'none', 
    margin: '0',
    padding: '0',
    "& li" : {
        padding: '5px 10px'
    },
    "& li:nthChild(odd)" : {
        background: '#eee'
    }
}

// const socket = io();

// Component

class Feature extends Component {
    constructor(props){
        super(props);
        // this.state = { message: '' }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            message: '',
            timestamp: 'no timestamp yet'
        };
    }
    componentWillMount() {
        this.props.fetchMessage();

        subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp 
          }));

        // this.socket.on('chat message', function(msg){
        //     $('#messages').append($('<li>').text(msg));
        // });
    }

    handleChange(event) {
        this.setState({message: event.target.value});
      }
    
    handleSubmit(event) {

        // this.socket.emit('chat message', this.state.message, (confirmation)=>{
        //     console.log(confirmation);
        // })
        // this.setState({ message: '' });
        // console.log('handleSubmit is working');
        
        // console.log(this.socket);

        // event.preventDefault();

        // convert jquery to react ?not necessary?
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
        
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.message}
                    {this.state.timestamp}
                </div>
                <ul id="messages" style={messagesStyle}></ul>
                <form onSubmit={this.handleSubmit} style={formStyle}>
                    <label>
                        <input type="text" 
                        name="chat message" 
                        id="m" 
                        value={this.state.message} 
                        onChange={this.handleChange} 
                        autoComplete="off"
                        style={inputStyle} />
                    </label>
                    <input type="submit" value="submit" style={submitStyle} />
                </form> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

// import MessageDisplay from './messageDisplay';

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

    handleChange(event) {
        this.setState({message: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();

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

      }

    render() {
        return (
            <div>
                <div>{this.props.message}</div>
                <form>
                    <label>
                        <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="submit" onSubmit={this.handleSubmit} />
                </form> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);
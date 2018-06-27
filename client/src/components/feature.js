// import React, { Component } from 'react';


// class Feature extends Component {
//     componentWillMount() {
//         this.props.fetchMessage();
//     }
//     render() {
//         return (
//             <div className="chat-screen">
//                 <ul id="messages"></ul>
//                 <form action="">
//                 <input id="m" autocomplete="off" />
//                 <button>Send</button>
//                 </form>
//             </div>
//         );
//     }
// }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
 
class Feature extends Component {
    constructor(props, context) {
        super(props, context);
        this.onMessage = this.onMessage.bind(this);
    }
 
    onMessage(message) {
        console.log(message);
    }
 
    render() {
        return (
            <div>
                <h1>My React SocketIO Demo.</h1>
                <Event event='eventName' handler={this.onMessage} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);
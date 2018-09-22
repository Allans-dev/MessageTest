import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import MessageDisplay from './messageDisplay';

class Feature extends Component {
    componentWillMount() {
        this.props.fetchMessage();
    }
    render() {
        return (
            <div>
                <div>{this.props.message}</div>
                <MessageDisplay />  
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);
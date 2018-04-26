import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Signin extends Component {

    handleFormSubmit({ email, password }) {
        // console.log(email, password);
        // console.log(this.props);
        // console.log('form sign in values : ', { email, password });
        // logging user in
        // console.log(this.props.signinUser({ email, password }));
        this.props.signinUser({ email, password });
    }

    renderInput({ label, type, ...field }) {
        return (
            <fieldset className="form-group">
                <label>{label}</label>
                <input {...field.input} type={type} className="form-control" />
            </fieldset>
        );
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        
        return (
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <Field name="email" component={this.renderInput} label="email" type="email" />
                <Field name="password" component={this.renderInput} label="password" type="password" />
                {this.renderAlert()}
                <button className="btn btn-primary" action="submit">
                    Sign in
                </button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

Signin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Signin);

export default reduxForm({ 
    form: 'signin' 
})(Signin);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {

    renderInput({ label, type, ...field }) {
        return (
            <fieldset className="form-group" key={label}>
                <label>{label}</label>
                <input {...field.input} type={type} className="form-control" />
                {field.meta.touched && field.meta.error && <span className="text-danger">{field.meta.error}</span>}
            </fieldset>
        );
    }

    handleFormSubmit(formProps) {
        // call action creator to signup up user
        this.props.signupUser(formProps);
        console.log('signup form submit action');
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
        const { handleSubmit } = this. props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field name="email" component={this.renderInput} label="Email:" type="email" />
                <Field name="password" component={this.renderInput} label="Password:" type="password" />
                <Field name="confirmPassword" component={this.renderInput} label="Confirm Password:" type="password" />
                {this.renderAlert()}              
                <button className="btn btn-primary" action="submit">
                    Sign up
                </button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email';
    }
    if (!values.password) {
        errors.password = 'Please enter a password';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match!!!!';
    }
    // console.log(values);
    // console.log(errors.password);
    // console.log('validate function firing');
    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

Signup = connect(
    mapStateToProps,
    actions
)(Signup);

export default reduxForm({
    form: 'signup',
    validate
})(Signup);
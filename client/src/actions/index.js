import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER,
    UNAUTH_USER, 
    AUTH_ERROR,
    FETCH_MESSAGE 
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
    return function(dispatch) {

        // redux-thunk allows the return of a function with an arg 'dispatch' 
        // which can be called to dispatch actions to reducers at any point.
        // eg. dispatch({ type: 'login', payload: 'etc' });
        // can dispatch more than one action in action creator

        console.log(`action called with: ${ email }, ${ password }`);

        // submit email/password to server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                // If request is good...
                //  - update state to indicate user is auth'ed
                dispatch({ type: AUTH_USER });
                //  - save the JWT token
                localStorage.setItem('token', response.data.token);
                //  - redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch(()=>{
                // If the request is bad...
                //  - show an error to the user
                dispatch(authError('Bad Sign in Info'));
            });

    };
};

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
        // console.log(email, password);
        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        })
        .catch(({ response }) => dispatch(authError(response.data.error)));
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER }
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                   type: FETCH_MESSAGE,
                   payload: response.data.message 
                });
            });
    };
}

// redux promise
// export function fetchMessage() {
//     const request = axios.get(ROOT_URL, {
//         headers: { authorization: localStorage.getItem('token')}
//     });

//     return {
//         type: FETCH_MESSAGE,
//         payload: request
//     };
// } 





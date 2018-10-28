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

        console.log(`signinUser action called`);

        // submit email/password to server
        postData(`${ROOT_URL}/signin`,{ email, password })
            .then(response => {
                // If request is good...
                //  - update state to indicate user is auth'ed
                dispatch({ type: AUTH_USER });
                //  - save the JWT token
                sessionStorage.setItem('token', response.data.token);
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
        postData(`${ROOT_URL}/signup`, { email, password })
        .then(response => {
            dispatch({ type: AUTH_USER });
            sessionStorage.setItem('token', response.data.token);
            console.log("token set");
            browserHistory.push('/feature');
        })
        // .catch(({ response }) => console.log(response));
        .catch(({ response }) => dispatch(authError(response.data.error)));
        console.log("signup user action called");
    };
}


function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
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

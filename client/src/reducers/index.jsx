import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import socketReducer from './socket_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  socket: socketReducer
});

export default rootReducer;

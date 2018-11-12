import { OPEN_SOCKET, CLOSE_SOCKET } from '../actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case OPEN_SOCKET:
            return { ...state, socket: true };
        case CLOSE_SOCKET:
            return { ...state, socket: false };
    }
    return state;
}
import * as Type from '../constants/ActionTypes';
var initialState = { uid: null, displayName: null, email: null };
const users = (state = initialState, action) => {
    switch (action.type) {
        case Type.GET_LOGIN_STATE:
            if (action.users) {
                state = action.users;
            } else {
                state = { uid: null, displayName: null, email: null };
            }
            break;
        default:
            break;
    }
    return state;
}

export default users;
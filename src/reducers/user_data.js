import * as Type from '../constants/ActionTypes';
var initialState = { address: "", avatar: "", mail_address: "", phone_number: "", user_name: "", user_type: "" };

const user_data = (state = initialState, action) => {
    switch (action.type) {
        case Type.FETCH_USERS_DATA:
            if (action.user_data) {
                state = action.user_data;
            }
            break;
        default:
            break;
    }
    return state;
}

export default user_data;
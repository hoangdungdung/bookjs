import * as Type from '../constants/ActionTypes';
var initialState = { key: [], value: [] };
const category = (state = initialState, action) => {
    switch (action.type) {
        case Type.DATA_CATEGORY:
            if (action.category) {
                state = { key: Object.keys(action.category), value: Object.values(action.category) };
            }
            break;
        default:
            break;
    }
    return state;
}

export default category;
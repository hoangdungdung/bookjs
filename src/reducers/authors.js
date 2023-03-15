import * as Type from '../constants/ActionTypes';
var initialState = { key: [], value: [] };
const authors = (state = initialState, action) => {
    switch (action.type) {
        case Type.DATA_AUTHOR:
            if (action.authors) {
                state = { key: Object.keys(action.authors), value: Object.values(action.authors) };
            }
            break;
        default:
            break;
    }
    return state;
}

export default authors;
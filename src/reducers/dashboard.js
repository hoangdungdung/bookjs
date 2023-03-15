import * as Type from '../constants/ActionTypes';
var initialState = { key: [], value: [] };
const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case Type.FETCH_DASHBOARD_DATA:
            if (action.dashboard) {
                state = action.dashboard;
            }
            break;
        default:
            break;
    }
    return state;
}

export default dashboard;
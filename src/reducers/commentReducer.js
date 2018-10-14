import ActionType from '../action/type';

export default function userReducer(state = null, action) {
    switch (action.type) {
        case ActionType.HOME_COMMENTS:
            return action.payload
        default:
            return state;
    }
};
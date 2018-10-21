import ActionType from '../action/type';

export default function modalReducer(state = false, action) {
    switch (action.type) {
        case ActionType.OPEN_LOGIN:
            return !state;
        default:
            return state;
    }
};
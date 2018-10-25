import ActionType from '../action/type';

export default function userReducer(state = null, action) {
    switch (action.type) {
        case ActionType.HOME_MENUS:
            return action.payload;
        case ActionType.SELECT_MENU:
            return action.payload;
        case ActionType.FILTER_MENU:
            return action.payload;
        default:
            return state;
    }

};
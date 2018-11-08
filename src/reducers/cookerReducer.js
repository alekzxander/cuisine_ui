import ActionType from '../action/type';

export default function cookerReducer(state = null, action) {
    switch (action.type) {
        case ActionType.CHEF_MENU:
            return action.payload;
        default:
            return state;
    }
};
import ActionType from '../action/type';

const initialState = {
    user: 'notLog'
}
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.REGISTER_COOKER:
            return action.payload
        case ActionType.REGISTER_USER:
            return action.payload
        case ActionType.ERROR_LOGIN:
            return action.payload.message
        case ActionType.LOGOUT:
            return initialState;
        case ActionType.UPDATE_USER:
            return action.payload;
        case ActionType.UPDATE_COOKER:
            return action.payload;
            case ActionType.BOOKING_DATE:
                state.date = action.payload;
                return state;
        default:
            return state;
    }

}
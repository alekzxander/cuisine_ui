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
            state.dates = action.payload;
            return state;
        case ActionType.ADD_COMMENT:
            state.reservations.map((reservation) => {
                if (reservation.id === action.payload) {
                    reservation.commented = true;
                }
                return reservation;
            });
            return state;
        case ActionType.BOOKING_MENU:
            state.reservations = [...state.reservations, action.payload];
            console.log(state)
            return state;
        default:
            return state;
    }

}
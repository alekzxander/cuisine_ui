import ActionType from '../action/type';

const localLogin = localStorage.getItem('login');

const initialState = JSON.parse(localLogin);
// console.log(initialState)
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.REGISTER_COOKER:
            return action.payload
        case ActionType.REGISTER_USER:
            return action.payload
        case ActionType.ERROR_LOGIN:
            return action.payload.message
        case ActionType.LOGOUT:
            const unLog = { user: 'user not log' }
            localStorage.setItem('login', JSON.stringify(unLog));
            return unLog;
        case ActionType.UPDATE_USER:
            localStorage.setItem('login', JSON.stringify(action.payload));
            return action.payload;
        case ActionType.UPDATE_COOKER:
            localStorage.setItem('login', JSON.stringify(action.payload));
            return action.payload;
        case ActionType.BOOKING_DATE:
            state.dates = action.payload;
            localStorage.setItem('login', JSON.stringify(state));
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
import ActionType from '../action/type';

const initialState = {
    user: 'notLog'
}
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.REGISTER_COOKER:
            const cooker = {
                email: action.payload.logCooker.email,
                firstname: action.payload.logCooker.first_name,
                lastname: action.payload.logCooker.last_name,
                id: action.payload.logCooker.id,
                token: action.payload.token,
                type: action.payload.type,
            };
            return cooker
        case ActionType.REGISTER_USER:
            return action.payload
        case ActionType.ERROR_LOGIN:
            console.log('error login')
            return action.payload.message
        case ActionType.LOGOUT:
            return initialState;
        case ActionType.UPDATE_USER:
            return action.payload;
        default:
            return state;
    }

}
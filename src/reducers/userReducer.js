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
                type: action.payload.type
            };
            return cooker
        case ActionType.REGISTER_USER:
            const user = {
                firstname: action.payload.logUser.first_name,
                lastname: action.payload.logUser.last_name,
                adresse: action.payload.logUser.adresse,
                phone: action.payload.logUser.phone,
                id: action.payload.logUser.id,
                token: action.payload.token,
                type: action.payload.type
            }
            return user
        case ActionType.ERROR_LOGIN:
            console.log('error login')
            return action.payload.message
        case ActionType.LOGOUT:
            return initialState;
        default:
            return state;
    }

}
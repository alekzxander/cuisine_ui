import ActionType from '../action/type';

export default function notificationReducer(state = '', action) {

    switch (action.type) {
        case ActionType.SUCCESS_REGISTER:
            return {
                type: 'success_register',
                message: 'Votre compte à bien était enregistré avec success'
            };
        default:
            return state;
    }
};
import ActionType from '../action/type';

export default function userReducer(state = null, action) {
    switch (action.type) {
        case ActionType.HOME_MENUS:
            return action.payload;
        case ActionType.SELECT_MENU:
            return action.payload;
        case ActionType.FILTER_MENU:
            return action.payload;
        case ActionType.MENUS_COOKER:
            return action.payload;
        case ActionType.CREATE_MENU:
            console.log(action.payload, 'reducer payload res menu')
            return [action.payload, ...state];
        case ActionType.REMOVE_MENU:
            const menusAfterRemove = state.filter((menu) => {
                if (menu.id !== action.payload) {
                    return menu;
                }
                return '';
            })
            return menusAfterRemove
        case ActionType.GET_MENU:
            const menu = state.filter((menu) => {
                if (menu.id === action.payload) {
                    return menu;
                }
                return '';
            });
            return menu[0];
        case ActionType.UPDATE_MENU:

            const update = action.payload;
            const menus = state.map((menu) => {
                if (menu.id === update.id) {
                    menu = update;
                }
                return menu
            });
            return menus;
        default:
            return state;
    }

};
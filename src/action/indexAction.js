import axios from 'axios';
import ActionType from './type';
export const registerUser = (firstname, lastname, email, adresse, phone, password, history) => {
    return async dispatch => {
        const user = {
            firstname,
            lastname,
            email,
            phone,
            adresse,
            password
        };
        const resUser = await axios.post('http://localhost:3001/profil-user', user);
        try {
            history.replace('/')
            dispatch({
                type: ActionType.REGISTER_USER,
                payload: resUser.data
            })
        } catch (err) {
            dispatch({
                type: ActionType.ERROR_LOGIN,
                payload: resUser.data
            })
        }

    }
}

export const registerCooker = (firstname, lastname, email, password, history) => {
    return async dispatch => {
        const cooker = {
            firstname,
            lastname,
            email,
            password
        };
        const resCooker = await axios.post('http://localhost:3001/profil-cooker', cooker);
        try {
            console.log(resCooker);
            history.replace('/')
            dispatch({
                type: ActionType.REGISTER_COOKER,
                payload: resCooker.data
            })
        } catch (err) {
            dispatch({
                type: ActionType.ERROR_LOGIN,
                payload: resCooker.data
            });
        }

    }
}

export const login = (email, password, history) => {
    return async dispatch => {
        const loger = {
            email,
            password
        };
        const resLoger = await axios.post('http://localhost:3001/login', loger);

        try {
            if (resLoger.data.type === 'cooker') {
                history.replace('/')
                dispatch({
                    type: ActionType.REGISTER_COOKER,
                    payload: resLoger.data
                })
            } else if (resLoger.data.type === 'user') {
                history.replace('/')
                dispatch({
                    type: ActionType.REGISTER_USER,
                    payload: resLoger.data
                })
            } else {
                dispatch({
                    type: ActionType.ERROR_LOGIN,
                    payload: resLoger.data
                })
            }
        } catch (err) {
            dispatch(err)
        }
    }
}
export const logout = () => {
    return dispatch => {
        dispatch({
            type: ActionType.LOGOUT,
            payload: null
        })
    }
}
export const commentHome = () => {
    return async dispatch => {
        const resComment = await axios.get('http://localhost:3001/comments');
        const getForComment = resComment.data.comments.filter((comment, i) => {
            if (i < 4) {
                return comment;
            }
            return '';
        });
        dispatch({
            type: ActionType.HOME_COMMENTS,
            payload: getForComment
        });
    }
};

export const menuHome = () => {
    return async dispatch => {
        const resMenu = await axios.get('http://localhost:3001/menus');
        dispatch({
            type: ActionType.HOME_MENUS,
            payload: resMenu.data.menus
        })
    }
};
export const toggleModal = () => {
    return dispatch => {
        dispatch({
            type: ActionType.OPEN_LOGIN,
            payload: null
        })
    }
}

export const getChefMenus = (id) => {
    return async dispatch => {

        const resChefMenu = await axios.get(`http://localhost:3001/menus_chef/${id}`);
        let comments = [];
        let typeOfCooker = [];
        const cooker = resChefMenu.data.menusByChef;
        cooker.menus.forEach((comment) => {
            return comment.comments.forEach((com) => {
                return comments.push(com);
            })
        });

        cooker.menus.forEach((getTypes) => {
            return getTypes.type_has_menus.forEach((type) => {
                return typeOfCooker.push(type.type)
            })
        });
        const menus = cooker.menus.map((menu) => {
            return menu;
        });
        const picture = await axios.get(`http://localhost:3001/image_chef/${cooker.id}`)
        const Cooker = {
            types: typeOfCooker,
            comments,
            id: cooker.id,
            lastname: cooker.last_name,
            firstname: cooker.first_name,
            email: cooker.email,
            presentation: cooker.presentation,
            menus,
            picture: picture.data

        };
        dispatch({
            type: ActionType.CHEF_MENU,
            payload: Cooker
        })

    }
}
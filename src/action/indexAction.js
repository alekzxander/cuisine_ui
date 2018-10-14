import axios from 'axios';
import ActionType from './type';
import { reset } from 'redux-form';

export const registerUser = (firstname, lastname, email, adresse, phone, password) => {
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
            dispatch(reset('RegisterUser'), {
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

export const registerCooker = (firstname, lastname, email, password) => {
    return async dispatch => {
        const cooker = {
            firstname,
            lastname,
            email,
            password
        };
        const resCooker = await axios.post('http://localhost:3001/profil-cooker', cooker);
        try {
            dispatch(reset('RegisterCooker'), {
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

export const login = (email, password) => {
    return async dispatch => {
        const loger = {
            email,
            password
        };
        const resLoger = await axios.post('http://localhost:3001/login', loger);
        try {
            if (resLoger.data.type === 'cooker') {
                console.log('dispatch to cooker')
                dispatch({
                    type: ActionType.REGISTER_COOKER,
                    payload: resLoger.data
                })
            } else if (resLoger.data.type === 'user') {
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

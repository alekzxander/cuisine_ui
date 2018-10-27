import axios from 'axios';
import ActionType from './type';

function getBase64(url) {
    return axios
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(response => new Buffer(response.data, 'binary').toString('base64'))
}

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
                const user = {
                    id: resLoger.data.logUser.id,
                    firstname: resLoger.data.logUser.first_name,
                    lastname: resLoger.data.logUser.last_name,
                    adresse: resLoger.data.logUser.adresse,
                    phone: resLoger.data.logUser.phone,
                    token: resLoger.data.token,
                    type: resLoger.data.type,
                    picture: await getBase64(`http://localhost:3001/image/${'User'}/${resLoger.data.logUser.id}`)
                }
                history.replace('/')
                dispatch({
                    type: ActionType.REGISTER_USER,
                    payload: user
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
        const getForComment = resComment.data.comments.map(async (comment, i) => {
            return comment.user.picture = await getBase64(`http://localhost:3001/image/${'User'}/${comment.user.id}`);
        });
        await Promise.all(getForComment);
        dispatch({
            type: ActionType.HOME_COMMENTS,
            payload: resComment.data.comments
        });
    }
};

export const menuHome = () => {
    return async dispatch => {
        const resMenu = await axios.get('http://localhost:3001/menus');
        const getImage = resMenu.data.menus.map(async (menu) => {
            return menu.picture = await getBase64(`http://localhost:3001/image/${'Menu'}/${menu.id}`)
        });
        await Promise.all(getImage);
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

export const selectCooker = (id) => {
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
            return menu
        });
        const menusPicture = menus.map(async (menu) => {
            return menu.picture = await getBase64(`http://localhost:3001/image/${'Menu'}/${menu.id}`);
        });
        await Promise.all(menusPicture);
        const Cooker = {
            types: typeOfCooker,
            comments,
            id: cooker.id,
            lastname: cooker.last_name,
            firstname: cooker.first_name,
            email: cooker.email,
            presentation: cooker.presentation,
            menus,
            picture: await getBase64(`http://localhost:3001/image/${'Cooker'}/${cooker.id}`)
        };

        dispatch({
            type: ActionType.CHEF_MENU,
            payload: Cooker
        })

    }
}
export const selectMenu = (id) => {
    return async dispatch => {
        const menu = await axios.get(`http://localhost:3001/menu/${id}`);
        menu.data.menu.picture = await getBase64(`http://localhost:3001/image/${'Menu'}/${menu.data.menu.id}`);
        menu.data.menu.cooker.picture = await getBase64(`http://localhost:3001/image/${'Cooker'}/${menu.data.menu.cooker.id}`);
        const commentImg = menu.data.menu.comments.map(async (comment) => {
            return comment.user.picture = await getBase64(`http://localhost:3001/image/${'User'}/${comment.user.id}`)
        })
        await Promise.all(commentImg);
        dispatch({
            type: ActionType.SELECT_MENU,
            payload: menu.data.menu
        })
    }
}

export const filterMenu = (filters) => {
    return async dispatch => {
        if (filters.length > 0) {
            const queryFilters = filters.map((filter, i) => {
                if (i < 1) {
                    return `?type=${filter}`
                }
                return `&type=${filter}`
            });
            let query = '';
            for (let i = 0; i < queryFilters.length; i++) {
                query += queryFilters[i];
            }
            console.log(`http://localhost:3001/menus/${query}/`)
            const resMenus = await axios.get(`http://localhost:3001/menus/${query}`);
            const getImage = resMenus.data.menus.map(async (menu) => {
                return menu.picture = await getBase64(`http://localhost:3001/image/${'Menu'}/${menu.id}`)
            });
            await Promise.all(getImage);
            dispatch({
                type: ActionType.FILTER_MENU,
                payload: resMenus.data.menus
            })
        } else {
            const resMenus = await axios.get(`http://localhost:3001/menus`);
            const getImage = resMenus.data.menus.map(async (menu) => {
                return menu.picture = await getBase64(`http://localhost:3001/image/${'Menu'}/${menu.id}`)
            });
            await Promise.all(getImage);
            dispatch({
                type: ActionType.FILTER_MENU,
                payload: resMenus.data.menus
            })
        }
    }
}

export const updateUserProfil = (id, token, firstname, lastname, picture, adresse, phone) => {
    return async dispatch => {
        console.log(token)
        const headers = {
            'Content-Type': 'application/json',
            'authorization': token,
        };
        const data = {
            firstname,
            lastname,
            picture,
            adresse,
            phone
        }
        const userUpdated = await axios.put(`/profil-user/${id}`, data, { headers });
        const user = userUpdated.data.userUpdated;
        const update = {
            id: user.id,
            firstname: user.first_name,
            lastname: user.last_name,
            adresse: user.adresse,
            phone: user.phone,
            token,
            type: userUpdated.data.type,
            picture: await getBase64(`http://localhost:3001/image/${'User'}/${user.id}`)
        }
        console.log(update)
        dispatch({
            type: ActionType.UPDATE_USER,
            payload: update
        })
    }
}
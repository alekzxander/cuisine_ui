import axios from 'axios';
import ActionType from './type';
import { showSnack } from 'react-redux-snackbar';

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
        const resUser = await axios.post('http://localhost:3001/user', user);
        if (resUser.data.logUser) {
            const userData = resUser.data.logUser;
            const userPayload = {
                id: userData.id,
                firstname: userData.first_name,
                lastname: userData.last_name,
                adresse: userData.adresse,
                phone: userData.phone,
                token: resUser.data.token,
                type: resUser.data.type,
                reservations: userData.reservations,
                picture: await getBase64(`http://localhost:3001/image/${'User'}/${userData.id}`)
            };
            localStorage.setItem('login', userPayload);
            console.log(userPayload)
            dispatch({
                type: ActionType.REGISTER_USER,
                payload: userPayload
            });
            history.replace('/')
            dispatch(showSnack('registerUser', {
                label: resUser.data.message,
                timeout: 7000,
                type: ' success',
                button: { label: `D'accord !` }
            }));
        } else {
            dispatch(showSnack('registerUser', {
                label: resUser.data.message,
                timeout: 7000,
                type: ' success',
                button: { label: `D'accord !` }
            }));
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
        const resCooker = await axios.post('http://localhost:3001/cooker', cooker);
        if (resCooker.data.logCooker) {
            const cooker = {
                email: resCooker.data.logCooker.email,
                firstname: resCooker.data.logCooker.first_name,
                lastname: resCooker.data.logCooker.last_name,
                id: resCooker.data.logCooker.id,
                token: resCooker.data.token,
                type: resCooker.data.type,
                presentation: resCooker.data.logCooker.presentation,
                dates: resCooker.data.logCooker.date_bookings,
                reservations: resCooker.data.logCooker.reservations,
                picture: await getBase64(`http://localhost:3001/image/${'Cooker'}/${resCooker.data.logCooker.id}`)
            };
            localStorage.setItem('login', cooker);
            history.replace('/')
            dispatch({
                type: ActionType.REGISTER_COOKER,
                payload: cooker
            });
            dispatch(showSnack('registerCooker', {
                label: resCooker.data.message,
                timeout: 7000,
                button: { label: `D'accord !` }
            }));
        } else {
            dispatch(showSnack('registerCooker', {
                label: resCooker.data.message,
                timeout: 7000,
                button: { label: `D'accord !` }
            }));
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
                const cooker = {
                    email: resLoger.data.logCooker.email,
                    firstname: resLoger.data.logCooker.first_name,
                    lastname: resLoger.data.logCooker.last_name,
                    id: resLoger.data.logCooker.id,
                    token: resLoger.data.token,
                    type: resLoger.data.type,
                    presentation: resLoger.data.logCooker.presentation,
                    dates: resLoger.data.logCooker.date_bookings,
                    reservations: resLoger.data.logCooker.reservations,
                    picture: await getBase64(`http://localhost:3001/image/${'Cooker'}/${resLoger.data.logCooker.id}`)
                };
                dispatch(showSnack('loginCooker', {
                    label: `Bon retour parmis nous chef ${resLoger.data.logCooker.first_name} !`,
                    timeout: 7000,
                    type: ' success',
                    button: { label: `D'accord !` }
                }));
                localStorage.setItem('login', JSON.stringify(cooker));
                dispatch({
                    type: ActionType.REGISTER_COOKER,
                    payload: cooker
                });
            } else if (resLoger.data.type === 'user') {
                const user = {
                    id: resLoger.data.logUser.id,
                    firstname: resLoger.data.logUser.first_name,
                    lastname: resLoger.data.logUser.last_name,
                    adresse: resLoger.data.logUser.adresse,
                    phone: resLoger.data.logUser.phone,
                    token: resLoger.data.token,
                    type: resLoger.data.type,
                    reservations: resLoger.data.logUser.reservations,
                    picture: await getBase64(`http://localhost:3001/image/${'User'}/${resLoger.data.logUser.id}`)
                };
                dispatch(showSnack('loginUser', {
                    label: `Bon retour parmis nous ${resLoger.data.logUser.first_name} !`,
                    timeout: 7000,
                    type: 'success',
                    button: { label: `D'accord !` }
                }));
                localStorage.setItem('login', JSON.stringify(user));
                dispatch({
                    type: ActionType.REGISTER_USER,
                    payload: user
                });
            } else if (resLoger.data.type === 'error') {
                dispatch(showSnack('errorLogin', {
                    label: `Le mail ou le mot de passe est incorrect !`,
                    timeout: 7000,
                    type: 'error',
                    button: { label: `D'accord !` }
                }));
            }
        } catch (err) {
            console.log('ERROR CATCHING')

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
        });
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

export const updateUserProfil = (id, token, firstname, lastname, image, adresse, phone) => {
    return async dispatch => {
        const data = JSON.stringify({
            firstname,
            lastname,
            adresse,
            phone
        })
        let formData = new FormData();
        formData.append('avatar', image);
        formData.set('data', data)
        const config = {
            headers: {
                'authorization': token,
                'content-type': 'multipart/form-data'
            }
        }
        const userUpdated = await axios.put(`/user/${id}`, formData, config);
        const user = userUpdated.data.userUpdated;
        const update = {
            id: user.id,
            firstname: user.first_name,
            lastname: user.last_name,
            adresse: user.adresse,
            phone: user.phone,
            token,
            type: userUpdated.data.type,
            reservations: user.reservations,
            picture: await getBase64(`http://localhost:3001/image/${'User'}/${user.id}`)
        }
        dispatch({
            type: ActionType.UPDATE_USER,
            payload: update
        });
        dispatch(showSnack('updateUser', {
            label: `Votre profil à était mis à jour!`,
            timeout: 7000,
            type: 'success',
            button: { label: `D'accord !` }
        }));
    }
};
export const updateCookerProfil = (id, token, firstname, lastname, image, presentation) => {
    return async dispatch => {
        const data = JSON.stringify({
            firstname,
            lastname,
            presentation
        });
        let formData = new FormData();
        formData.append('avatar', image);
        formData.set('data', data);
        const config = {
            headers: {
                'authorization': token,
                'content-type': 'multipart/form-data'
            }
        }
        const cookerUpdated = await axios.put(`/cooker/${id}`, formData, config);
        const cooker = cookerUpdated.data.cookerUpdated;
        const update = {
            id: cooker.id,
            lastname: cooker.last_name,
            firstname: cooker.first_name,
            presentation: cooker.presentation,
            token,
            type: cookerUpdated.data.type,
            dates: cooker.date_bookings,
            reservations: cooker.reservations,
            picture: await getBase64(`http://localhost:3001/image/${'Cooker'}/${cooker.id}`)
        }
        dispatch({
            type: ActionType.UPDATE_COOKER,
            payload: update
        });
        dispatch(showSnack('updateCooker', {
            label: `Votre profil à était mis à jour!`,
            timeout: 7000,
            type: 'success',
            button: { label: `D'accord !` }
        }));
    }
};

export const menuByCooker = (id) => {
    return async dispatch => {
        const menus = await axios.get(`http://localhost:3001/menus_cooker/${id}`);
        const menusPicture = menus.data.menus.map(async (menu) => {
            return menu.picture = await getBase64(`http://localhost:3001/image/${'Menu'}/${menu.id}`);
        });
        await Promise.all(menusPicture);
        dispatch({
            type: ActionType.MENUS_COOKER,
            payload: menus.data.menus
        })
    }
};
export const createMenu = (token, title, start, dish, draft, price, dessert, picture, type) => {
    return async dispatch => {
        const data = JSON.stringify({
            title,
            start,
            dish,
            dessert,
            draft,
            price,
            type
        });
        let formData = new FormData();
        formData.append('picture', picture);
        formData.set('data', data);
        const config = {
            headers: {
                'authorization': token,
                'content-type': 'multipart/form-data'
            }
        }
        const menu = await axios.post(`/menu`, formData, config);
        const getType = await axios.get(`/menu_type/${menu.data.newMenu.id}`);
        menu.data.newMenu.type_has_menus = getType.data.types;
        menu.data.newMenu.picture = await getBase64(`http://localhost:3001/image/${'Menu'}/${menu.data.newMenu.id}`);
        dispatch({
            type: ActionType.CREATE_MENU,
            payload: menu.data.newMenu
        });
    }
}
export const removeMenu = (id, token) => {
    return async dispatch => {
        const config = {
            headers: {
                'authorization': token,
            }
        }
        const resStatus = await axios.delete(`/menu/${id}`, config)
        if (resStatus.status === 200) {
            dispatch({
                type: ActionType.REMOVE_MENU,
                payload: id
            });
        } else {
            console.log('error remove')
        }
    }
}

export const getMenu = (id) => {
    return async dispatch => {
        dispatch({
            type: ActionType.GET_MENU,
            payload: id
        });
    }
}

export const updateMenu = (token, id, title, start, dish, draft, price, dessert, picture, type) => {
    return async dispatch => {
        const data = JSON.stringify({
            title,
            start,
            dish,
            dessert,
            draft,
            price,
            type
        });
        let formData = new FormData();
        formData.append('picture', picture);
        formData.set('data', data);
        const config = {
            headers: {
                'authorization': token,
                'content-type': 'multipart/form-data'
            }
        }
        const resMenu = await axios.put(`/menu/${id}`, formData, config);
        if (resMenu.status === 200) {
            const menu = resMenu.data.menu;
            const getTypes = await axios.get(`/menu_type/${menu.id}`);
            menu.type_has_menus = getTypes.data.types;
            console.log(menu, 'after update')
            menu.picture = await getBase64(`http://localhost:3001/image/${'Menu'}/${id}`);
            dispatch({
                type: ActionType.UPDATE_MENU,
                payload: menu
            });
        }
    }
}
export const dateBooking = (date, token) => {
    return async dispatch => {
        const config = {
            headers: {
                'authorization': token,
            }
        }
        const data = {
            date
        }
        const resBook = await axios.post(`/date`, data, config);
        if (resBook.status === 200) {
            dispatch({
                type: ActionType.BOOKING_DATE,
                payload: resBook.data.dates
            })
        } else {
            dispatch(showSnack('errDate', {
                label: `Une erreur est survenue. Vos dates n'ont pas pu être enregistré.`,
                timeout: 7000,
                type: 'error',
                button: { label: `D'accord !` }
            }));
        }

    }
}
export const addComment = (token, comment, note, menuId, reservationId) => {
    return async dispatch => {
        const config = {
            headers: {
                'authorization': token,
            }
        }
        const data = {
            comment,
            note
        };
        const resComment = await axios.post(`/comment/${menuId}/${reservationId}`, data, config);
        console.log(resComment)
        if (resComment.status === 200) {
            dispatch({
                type: ActionType.ADD_COMMENT,
                payload: reservationId
            });
            dispatch(showSnack('addComment', {
                label: `Merci pour vôtre commentaire !!`,
                timeout: 7000,
                type: 'success',
                button: { label: `D'accord !` }
            }));
        } else {
            console.log('error comment')
        }
    }
}
export const bookMenu = (token, dateId, menuId, nbGuest) => {
    return async dispatch => {
        const config = {
            headers: {
                'authorization': token,
            }
        };
        const data = {
            nbGuest,
            menuId,
            dateId
        };
        const resReservation = await axios.post(`/reservation`, data, config);
        if (resReservation.status === 200) {
            window.location = resReservation.data.payment.links[1].href;
        } else {
            dispatch(showSnack('errReservation', {
                label: `Désolé une erreur s'est produite lors de la verification des informations.`,
                timeout: 7000,
                button: { label: `D'accord !` }
            }));
        }
    }
}
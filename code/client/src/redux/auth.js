import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
        isLoading: false,
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token'),
        user: function() {
            const credits = localStorage.getItem('creds');
            if (!credits) // debug purpose
                return {
                    username: 'No username',
                    password: 'No password',
                    info: {},
                };
            const parsedCredits = JSON.parse(localStorage.getItem('creds'));
            const i = parsedCredits.info;
            const info = {
                _id: i._id,
                username: i.username,
                firstName: i.firstName,
                lastName: i.lastName,
                email: i.email,
                phone: i.phone,
                typeUser: i.typeUser,
                coin: i.coin,
            }
            return {
                username: parsedCredits.username,
                password: parsedCredits.password,
                info: info,
            }
        }(),
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.creds
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                token: action.token
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            };
        default:
            return state
    }
}
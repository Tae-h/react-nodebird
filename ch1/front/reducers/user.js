
export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {},
    isLoggingIn: false, // 로그인 시도중
    isLoggingOut: false, // 로그아웃 시도중
};

/* thunk 이렇게 쓰는게 끝임 */
/*export const loginAction = (data) => {
    return (dispatch, getState) => {
        dispatch(loginSuccessAction());
        axios.post('/api/login')
            .then((res) => {
            dispatch(loginSuccessAction(res.data));
        })
            .catch((err) => {
                dispatch(loginFailureAction(err));
        })
    }
}*/

export const loginRequestAction  = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

export const logoutRequestAction  = () => {
    return {
        type: 'LOG_OUT_REQUEST',
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOG_IN_REQUEST': {
            return {
                ...state,
                isLoggingIn: true, // 로그인 중
            };
        }
        case 'LOG_IN_SUCCESS': {
            return {
                ...state,
                isLoggedIn: true,
                isLoggingIn: false,
                me: {...action.data, nickname: 'tae-h'},
            };
        }
        case 'LOG_IN_FAILURE': { // 로그인 실패 시
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: false,
            };
        }
        case 'LOG_OUT_REQUEST': {
            return {
                ...state,
                isLoggingOut: true,
            }
        }
        case 'LOG_OUT_SUCCESS': {
            return {
                ...state,
                isLoggedIn: false,
                isLoggingOut: false,
                me: null,
            }
        }
        case 'LOG_OUT_FAILURE': {
            return {
                ...state,
                isLoggingOut: false,
            }
        }
        default:
            return state;
    }
}

export default reducer;
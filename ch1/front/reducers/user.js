
export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {}
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

export const loginAction  = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

export const logoutAction  = () => {
    return {
        type: 'LOG_OUT',
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOG_IN': {
            return {
                ...state,
                isLoggedIn: true,
                me: action.data,
            };
        }
        case 'LOG_OUT': {
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }
        }
        default:
            return state;
    }
}

export default reducer;
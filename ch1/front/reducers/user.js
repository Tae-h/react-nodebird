
export const initialState = {
    me: null, // 요거 데이터 형식이 뭐지....
    signUpData: {},
    loginData: {},

    loginLoading: false, // 로그인 시도중
    loginDone: false,
    loginError: null,

    logoutLoading: false,
    logoutDone: false,
    logoutError: false,

    signUpLoading: false, // 가입 시도중
    signUpDone: false,
    signUpError: null,

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

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';



export const loginRequestAction  = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}

export const logoutRequestAction  = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
}

const dummyUser = (data) => ({
    ...data,
    nickname: 'Tae-h',
    id: 1,
    Posts: [],
    Followings: [],
    Followers: [],
});

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case LOG_IN_REQUEST: {
            return {
                ...state,
                loginLoading: true, // 로그인 중
                loginError: null,
                loginDone: false,
            };
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                loginLoading: false,
                loginDone: true,
                me: dummyUser(...action.data),
            };
        }
        case LOG_IN_FAILURE: { // 로그인 실패 시
            return {
                ...state,
                loginDone: false,
                loginLoading: false,
                loginError: action.error,
            };
        }

        case LOG_OUT_REQUEST: {
            return {
                ...state,
                logoutLoading: true,
                logoutDone: false,
            }
        }
        case LOG_OUT_SUCCESS: {
            return {
                ...state,
                logoutDone: true,
                logoutLoading: false,
                me: null,
            }
        }
        case LOG_OUT_FAILURE: {
            return {
                ...state,
                logoutLoading: false,
                logoutError: action.error,
            }
        }

        case SIGN_UP_REQUEST: {
            return {
                ...state,
                signUpLoading: true,
                signUpDone: false,
            }
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                signUpLoading: false,
                signUpDone: true,
                me: null,
            }
        }
        case SIGN_UP_FAILURE: {
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.error,
            }
        }
        default:
            return state;
    }
}

export default reducer;

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

    changeNicknameLoading: false, // 닉네임 변경
    changeNicknameDone: false,
    changeNicknameError: null,
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

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';// 본인 게시글 추가
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';// 본인 게시글 삭제

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

export const changeNicknameRequestAction = (data) => {
    return {
        type: CHANGE_NICKNAME_REQUEST,
        data,
    }
}

const dummyUser = (data) => ({
    ...data,
    nickname: 'Tae-h',
    id: 1,
    Posts: [{id: 1}],
    Followings: [{ nickname: '팔로잉1' }, { nickname: '팔로잉2' }, { nickname: '팔로잉3' }],
    Followers: [{ nickname: '팔로워1' }, { nickname: '팔로워2' }, { nickname: '팔로워3' }],
});

const reducer = (state = initialState, action) => {

    switch (action.type) {
        /* 로그인 */
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
                me: dummyUser(action.data),
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
        /* 로그아웃 */
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
        /* 회원가입 */
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
        /* 닉네임 변경 */
        case CHANGE_NICKNAME_REQUEST: {
            return {
                ...state,
                changeNicknameLoading: true,
                changeNicknameDone: false,
                changeNicknameError: null,
            }
        }
        case CHANGE_NICKNAME_SUCCESS: {
            return {
                ...state,
                changeNicknameLoading: false,
                changeNicknameDone: true,
            }
        }
        case CHANGE_NICKNAME_FAILURE: {
            return {
                ...state,
                changeNicknameLoading: false,
                changeNicknameError: action.error,
            }
        }
        case ADD_POST_TO_ME: {
            return {
                ...state,
                me: {
                    ...state.me, // 불변성 중요!
                    Posts: [{id: action.data}, ...state.me.Posts],
                }
            }
        }
        case REMOVE_POST_OF_ME: {
            return {
                ...state,
                me: {
                    ...state.me, // 불변성 중요!
                    Posts: state.me.Posts.filter((v) => v.id !== action.data)
                }
            }
        }
        default:
            return state;
    }
}

export default reducer;
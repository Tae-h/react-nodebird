import produce from "immer"

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

    followLoading: false,
    followDone: false,
    followError: null,

    unFollowLoading: false,
    unFollowDone: false,
    unFollowError: null,
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
    return produce(state, (draft) => {
        switch (action.type) {
            /* 필로우 */
            case FOLLOW_REQUEST: {
                draft.followLoading = true;
                draft.followError = null;
                draft.followDone = false;
                break;
            }
            case FOLLOW_SUCCESS: {
                draft.followLoading = false;
                draft.followDone = true;
                draft.me.Followings.push({id: action.data});
                break;
            }
            case FOLLOW_FAILURE: {
                draft.followDone = false;
                draft.followLoading = false;
                draft.followError = action.error;
                break;
            }
            /* 언팔팔*/
            case UNFOLLOW_REQUEST: {
                draft.unFollowLoading = true;
                draft.unFollowError = null;
                draft.unFollowDone = false;
                break;
            }
            case UNFOLLOW_SUCCESS: {
                draft.unFollowLoading = false;
                draft.unFollowDone = true;
                draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
                break;
            }
            case UNFOLLOW_FAILURE: {
                draft.unFollowDone = false;
                draft.unFollowLoading = false;
                draft.unFollowError = action.error;
                break;
            }
            /* 로그인 */
            case LOG_IN_REQUEST: {
                draft.loginLoading = true; // 로그인 중
                draft.loginError = null;
                draft.loginDone = false;
                break;
            }
            case LOG_IN_SUCCESS: {
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.me = dummyUser(action.data);
                break;
            }
            case LOG_IN_FAILURE: { // 로그인 실패 시
                draft.loginDone = false;
                draft.loginLoading = false;
                draft.loginError = action.error;
                break;
            }
            /* 로그아웃 */
            case LOG_OUT_REQUEST: {
                draft.logoutLoading = true;
                draft.logoutDone = false;
                break;
            }
            case LOG_OUT_SUCCESS: {
                draft.logoutDone = true;
                draft.logoutLoading = false;
                draft.me = null;
                break;
            }
            case LOG_OUT_FAILURE: {
                draft.logoutLoading = false;
                draft.logoutError = action.error;
                break;
            }
            /* 회원가입 */
            case SIGN_UP_REQUEST: {
                draft.signUpLoading = true;
                draft.signUpDone = false;
                break;
            }
            case SIGN_UP_SUCCESS: {
                draft.signUpLoading = false;
                draft.signUpDone = true;
                draft.me = null;
                break;
            }
            case SIGN_UP_FAILURE: {
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
            }
            /* 닉네임 변경 */
            case CHANGE_NICKNAME_REQUEST: {
                draft.changeNicknameLoading = true;
                draft.changeNicknameDone = false;
                draft.changeNicknameError = null;
                break;
            }
            case CHANGE_NICKNAME_SUCCESS: {
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                break;
            }
            case CHANGE_NICKNAME_FAILURE: {
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            }
            case ADD_POST_TO_ME: {
                draft.me.Posts.unshift({id: action.data});
                break;
            }
            case REMOVE_POST_OF_ME: {
                draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
                break;
            }
            default:
                break;
        }
    });

}

export default reducer;
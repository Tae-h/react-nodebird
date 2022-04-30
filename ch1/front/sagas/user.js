import {fork, all, put, call, delay, takeLatest} from "redux-saga/effects";
//import { takeLatest} from "redux-saga";
import axios from "axios";
import {
    CHANGE_NICKNAME_FAILURE,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS, REMOVE_FOLLOWER_FAILURE, REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UNFOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS
} from "../reducers/user";

/* API */
function loginAPI(data) {
    return axios.post('/user/login', data);
}

function logoutAPI() {
    return axios.post('/user/logout');
}

// 회원가입
function signUpAPI(data) {
    return axios.post('/user/signup', data)
}

function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
}

function unFollowAPI(data) {
    return axios.delete(`/user/${data}/follow`);
}

// 내 정보 가져오기
function loadMyInfoAPI() {
    return axios.get('/user');// 쿠키에서 데이터 가져다 쓸거임 데이터 안넘거도 됨
}

// 유저 정보 가져오기
function loadUserAPI(data) {
    return axios.get(`/user/${data}`);
}

function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', {nickname: data});
}

function loadFollowersAPI(data) {
    return axios.get(`/user/followers`, data);
}

function loadFollowingsAPI(data) {
    return axios.get(`/user/followings`, data);
}

function removeFollowerAPI(data) {
    return axios.delete(`/user/follower/${data}`);
}



/* gen */
function* logIn(action) {
    try {
        console.log(action)
        const result = yield call(loginAPI, action.data); // 나머지는 매개 변
        //yield delay(2000);
        yield put({ // put 특정 action 을 dispatch 시켜줌
            type: LOG_IN_SUCCESS,
            //data: result.data // 성공 결과
            data: result.data,
        });
    } catch (err) { // err.response.data
        console.error(err)
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }

}

function* logOut() {
    try {

        const result = yield call(logoutAPI);
        yield put({ // put 특정 action 을 dispatch 시켜줌
            type: LOG_OUT_SUCCESS,
           // data: result.data // 성공 결과
        });
    } catch (err) { // err.response.data
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }

}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        //yield delay(1000);
        console.log('signUp:: ', result);
        yield put({
            type: SIGN_UP_SUCCESS,
            //data:
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}

function* follow(action) {
    try {

        const result = yield call(followAPI, action.data);

        yield put({
            type: FOLLOW_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function* unFollow(action) {
    try {
        const result = yield call(unFollowAPI, action.data);

        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function* loadMyInfo() {
    try {
        const result = yield call(loadMyInfoAPI);

        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        })
    }
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_USER_FAILURE,
            error: err.response.data,
        });
    }
}

function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data);

        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        })
    }
}

function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data);

        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data,
        })
    }
}

function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data);

        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data,
        })
    }
}

function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);

        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: err.response.data,
        })
    }
}






// 이벤트 리스너 같은 역할
function* watchLogIn() { // 문제: 한 번 밖에 호출 못함 ex) 로그인 -> 로그 아웃 -> 로그인 하려고 하면 이 이벤트 리스너가 사라짐
    // while 을 사용하면 계속 호출 할 수 있음
    /* while take 방식은 동기적으로 동작 하지만 takeEvery 방힉은 비동기로 동작 */

    /*while (true) {
        yield take('LOG_IN_REQUEST', logIn)
    }*/

    // takeEvery --> while 문을 대체 할 수 있음
    //yield takeEvery('LOG_IN_REQUEST', logIn); // LOG_IN 이란 액션이 dispatch 되면 제너레이터를 next
    yield takeLatest(LOG_IN_REQUEST, logIn); // 클릭 살수로 두번 할때 사용 --> 두번 둘릴때 100번을 눌러도 마지막것만 실행

}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser());
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default function* userSaga () {

    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLoadMyInfo),
        fork(watchLoadUser),
        fork(watchChangeNickname),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),

    ])
}
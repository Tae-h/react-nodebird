import {fork, all, put, call, delay, takeLatest} from "redux-saga/effects";
//import { takeLatest} from "redux-saga";
import axios from "axios";
import {
    FOLLOW_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UNFOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS
} from "../reducers/user";

/* API */
function loginAPI(data) {
    return axios.post('/api/login', data);
}

function logoutAPI() {
    return axios.post('/api/logout');
}

function signUpAPI(data) {
    return axios.post('/api/signup', data)
}

function followAPI(data) {
    return axios.post('/api/follow', data)
}

function unFollowAPI(data) {
    return axios.post('/api/unfollow', data)
}

/* gen */
function* logIn(action) {
    console.log('logIn', action);
    try {
        console.log(action)
        // const result = yield call(loginAPI, action.data, 'a', 'b'); // 나머지는 매개 변
        yield delay(2000);
        yield put({ // put 특정 action 을 dispatch 시켜줌
            type: LOG_IN_SUCCESS,
            //data: result.data // 성공 결과
            data: action.data
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

        //const result = yield call(logoutAPI);
        yield delay(1000);
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

function* signUp() {
    try {
        //const result = yield call(signUpAPI);
        yield delay(1000);

        yield put({
            type: SIGN_UP_SUCCESS,
            //data:
        })
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}

function* follow(action) {
    try {
        yield delay(1000);

        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
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
        yield delay(1000);

        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
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

export default function* userSaga () {

    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnFollow),

    ])
}
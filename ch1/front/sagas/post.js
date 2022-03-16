import axios from "axios";
import {all, delay, call, fork, put, takeLatest} from "redux-saga/effects";

function addPostAPI(data) {
    return axios.post('/api/post', data)
}

function* addPost(action) {
    try {

        //const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({ // put 특정 action 을 dispatch 시켜줌
            type: 'ADD_POST_SUCCESS',
          //  data: result.data // 성공 결과
        });
    } catch (err) { // err.response.data
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data,
        })
    }

}

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga () {
    yield all([
        fork(watchAddPost),
    ]);
}
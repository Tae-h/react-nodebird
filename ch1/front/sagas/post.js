import axios from "axios";
import {all, delay, call, fork, put, takeLatest, throttle} from "redux-saga/effects";
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";
import shortid from "shortid";

function addPostAPI(data) {
    return axios.post('/post', { content: data })
}

function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}

function removePostAPI(data) {
    return axios.delete(`/api/post/${data.id}`);
}

function loadPostsAPI(data) {
    return axios.get(`/posts`, data);
}

function* addPost(action) {
    try {
        const id = shortid.generate();
        const result = yield call(addPostAPI, action.data);
        //yield delay(1000);
        yield put({ // put 특정 action 을 dispatch 시켜줌
            type: ADD_POST_SUCCESS,
            data: {
                id,
                data: result.data,
            }
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        })
    } catch (err) { // err.response.data
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        });
    }

}


function* addComment(action) {
    try {

        const result = yield call(addCommentAPI, action.data);
        yield put({ // put 특정 action 을 dispatch 시켜줌
            type: ADD_COMMENT_SUCCESS,
            data: result.data // 성공 결과
        });
    } catch (err) { // err.response.data
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }

}

function* removePost(action) {
    try {
        yield delay(1000);
        const id = shortid.generate();

        yield put({ // put 특정 action 을 dispatch 시켜줌
            type: REMOVE_POST_SUCCESS,
            data: action.data // 데이터
        });

        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action.data);

        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data
        });
    }
}

function* watchRemoveComment() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadPosts() {
    yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga () {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemoveComment),
        fork(watchLoadPosts),
    ]);
}
import axios from "axios";
import {all, call, fork, put, takeLatest, throttle} from "redux-saga/effects";
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    RETWEET_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";
import shortid from "shortid";

function addPostAPI(data) {
    return axios.post('/post', data)
}

function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}

function removePostAPI(data) {
    return axios.delete(`/post/${data}`);
}

function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}`);
}

function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}


function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`);
}

function unLikePostAPI(data) {
    return axios.delete(`/post/${data}/like`);
}

function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data);
}

function retweetAPI(data) {
    return axios.post(`/post/${data}/retweet`);
}

function loadUserPostsAPI(data, lastId) {
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function loadHashtagPostsAPI(data, lastId) {
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* addPost(action) {
    try {
        //const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            //data: result.data,
            data: action.data
        });
        yield put({
            type: ADD_POST_TO_ME,
            //data: result.data.id,
            data: action.data
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        });
    }
}


function* addComment(action) {
    try {

        //const result = yield call(addCommentAPI, action.data);
        yield put({ // put 특정 action 을 dispatch 시켜줌
            type: ADD_COMMENT_SUCCESS,
            //data: result.data // 성공 결과
            data: action.data
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
        //const result = yield call(removePostAPI, action.data);
        //const id = shortid.generate();

        yield put({ // put 특정 action 을 dispatch 시켜줌
            type: REMOVE_POST_SUCCESS,
            //data: result.data // 데이터
            data: action.data
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
        //const result = yield call(loadPostsAPI, action.lastId);

        yield put({
            type: LOAD_POSTS_SUCCESS,
            //data: result.data,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data
        });
    }
}

function* loadPost(action) {
    try {
        //const result = yield call(loadPostAPI, action.data);

        yield put({
            type: LOAD_POST_SUCCESS,
            //data: result.data,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response.data
        });
    }
}

function* likePost(action) {
    try {
        //const result = yield call(likePostAPI, action.data);

        yield put({
            type: LIKE_POST_SUCCESS,
            //data: result.data,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response.data
        });
    }
}

function* unLikePost(action) {
    try {
        //const result = yield call(unLikePostAPI, action.data);

        yield put({
            type: UNLIKE_POST_SUCCESS,
            //data: result.data,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response.data
        });
    }
}

function* uploadImages(action) {
    try {
        //const result = yield call(uploadImagesAPI, action.data);

        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            //data: result.data,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data
        });
    }
}

function* retweet(action) {
    try {
        //const result = yield call(retweetAPI, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            //data: result.data,
            data: action.data
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: RETWEET_FAILURE,
            error: err.response.data,
        });
    }
}

function* loadUserPosts(action) {
    try {
        //const result = yield call(loadUserPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            //data: result.data,
            data: action.data
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}

function* loadHashtagPosts(action) {
    try {
        //const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            //data: result.data,
            data: action.data
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            data: err.response.data,
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

function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchPostRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet);
}

function* watchLoadUserPosts() {
    yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadHashtagPosts() {
    yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

export default function* postSaga () {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemoveComment),
        fork(watchLoadPosts),
        fork(watchLoadPost),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchRemovePost),
        fork(watchUploadImages),
        fork(watchPostRetweet),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
    ]);
}

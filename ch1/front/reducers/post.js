import shortid from 'shortid';
import {ADD_POST_TO_ME} from "./user";
import produce from "immer";
import faker from 'faker';

export const initialState = {
    mainPosts: [ // 더미 데이터
        /*{
            id: 1,
            User: {id: 1, nickname: 'Tae-h'},
            content: '테스트 #해시태그 #해시태그2 ',
            Images: [
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003341/rn_view_BN003341.jpg'},
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003330/rn_view_BN003330.jpg'},
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003330/rn_view_BN003330.jpg'},
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003330/rn_view_BN003330.jpg'},
            ],
            Comments: [

                {id: shortid.generate(), User: {id: shortid.generate(), nickname: '댓글러1-1'}, content: '코멘트 1-1'},
                {id: shortid.generate(), User: {id: shortid.generate(), nickname: '댓글러1-2'}, content: '코멘트 1-2'}
            ]
        },
        {
            id: 2,
            User: {id: 2, nickname: '테스터2'},
            content: '테스트 글입니당!2',
            Images: [
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003341/rn_view_BN003341.jpg'},
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003330/rn_view_BN003330.jpg'},
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003311/rn_view_BN003311.jpg'},
            ],
            Comments: [
                {id: shortid.generate(),User: {id: shortid.generate(),nickname: '댓글러2-1'}, content: '코멘트 2-1'},
                {id: shortid.generate(),User: {id: shortid.generate(),nickname: '댓글러2-2'}, content: '코멘트 2-2'}
            ]
        },
        {
            id: 3,
            User: {id: 3, nickname: '테스터3'},
            content: '테스트 글입니당!3',
            Images: [
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003341/rn_view_BN003341.jpg'},
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003330/rn_view_BN003330.jpg'},
            ],
            Comments: [
                {id: shortid.generate(),User: {id: shortid.generate(),nickname: '댓글러3-1'}, content: '코멘트 3-1'},
                {id: shortid.generate(),User: {id: shortid.generate(),nickname: '댓글러3-2'}, content: '코멘트 3-2'}
            ]
        },
        {
            id: 4,
            User: {id: 4, nickname: '테스터4'},
            content: '테스트 글입니당!4',
            Images: [
                {id: shortid.generate(),src: 'https://gimg.gilbut.co.kr/book/BN003341/rn_view_BN003341.jpg'},
            ],
            Comments: [
                {id: shortid.generate(),User: {id: shortid.generate(),nickname: '댓글러4-1'}, content: '코멘트 4-1'},
                {id: shortid.generate(),User: {id: shortid.generate(),nickname: '댓글러4-2'}, content: '코멘트 4-2'}
            ]
        },*/
    ],
    imagePaths: [], // <-- 이미지 업로드시 경로 저장

    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,

    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,

    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    hasMorePosts: true, // true 일때만 가져올거임!

    likePostLoading: false,
    likePostDone: false,
    likePostError: null,

    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,

    deletePostLoading: false,
    deletePostDone: false,
    deletePostError: null,

    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,

    retweetLoading: false,
    retweetDone: false,
    retweetError: null,

    singlePost: null,
};

const dummyData = (data) => ({
    id: data.id,
    User: {id: 1, nickname: 'Tae-h'},
    content: data.content,
    Images: [],
    Comments: []
})

const dummyComment = (data) => ({
    id: shortid.generate(),
    User: {id: 1, nickname: 'Tae-h'},
    content: data,
});

export const generateDummyPost = (number) =>
    Array(number).fill().map(() => ({
        id: shortid.generate(),
        User: {
            id: shortid.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.paragraph(),
        Images: [
            {id: shortid.generate(), src: faker.image.image()},
        ],
        Comments: [
            {
                id: shortid.generate(),
                User: {
                    id: shortid.generate(),
                    nickname: faker.name.findName(),
                },
                content: faker.lorem.sentence(),
            },
        ],
}));


//initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(20));

/* 화면 로드 */
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

// 포스트 단건
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const addPostAction = (data) => {
    return {
        type: ADD_POST_REQUEST,
        data,
    }
}


export const addCommentAction = (data) => {
    return {
        type: ADD_COMMENT_REQUEST,
        data,
    }
}


// reducer : 이전 상태를 액션을 통해 다음 상태로 만들어내는 함 (불변성은 지켜야함)
const reducer = (state = initialState, action) => {
    // immer 사용 기본 꼴 --> 불변성 보장
    return produce(state, (draft) => {
        // state 기 draft (다음 상태) 로 변함 state --> draft 불변성 보장

        switch (action.type) {
            case RETWEET_REQUEST:
                draft.retweetLoading = true;
                draft.retweetDone = false;
                draft.retweetError = null;
                break;
            case RETWEET_SUCCESS: {
                draft.retweetLoading = false;
                draft.retweetDone = true;
                draft.mainPosts.unshift(action.data);
                break;
            }
            case RETWEET_FAILURE:
                draft.retweetLoading = false;
                draft.retweetError = action.error;
                break;

            case REMOVE_IMAGE:
                draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
                break;

            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case UPLOAD_IMAGES_SUCCESS: {
                draft.imagePaths = action.data;
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                break;
            }
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;

            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers.push({ id: action.data.UserId });
                draft.likePostLoading = false;
                draft.likePostDone = true;
                break;
            }
            case LIKE_POST_FAILURE:
                draft.likePostLoading = false;
                draft.likePostError = action.error;
                break;

            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading = true;
                draft.unlikePostDone = false;
                draft.unlikePostError = null;
                break;
            case UNLIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
                draft.unlikePostLoading = false;
                draft.unlikePostDone = true;
                break;
            }
            case UNLIKE_POST_FAILURE:
                draft.unlikePostLoading = false;
                draft.unlikePostError = action.error;
                break;
            case LOAD_USER_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
            case LOAD_POSTS_REQUEST: {
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            }
            case LOAD_USER_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_POSTS_SUCCESS: {
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = draft.mainPosts.concat(action.data);
                draft.hasMorePosts = draft.mainPosts.length === 10;
                break;
            }
            case LOAD_USER_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_POSTS_FAILURE: {
                draft.loadPostsLoading =  false;
                draft.loadPostsError = action.error;
                break;
            }
            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS:
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.singlePost = action.data;
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;
            case ADD_POST_REQUEST: {
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
                /*return {
                    ...state,
                    addPostLoading: true,
                    addPostDone: false,
                    addPostError: null,
                }*/
            }
            case ADD_POST_SUCCESS: {
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(action.data);
                draft.imagePaths = [];
                break;
            }
            case ADD_POST_FAILURE: {
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            }

            case ADD_COMMENT_REQUEST: {
                draft.addCommentLoading = true;
                draft.addCommentError = null;
                draft.addCommentDone = false;
                break;
            }
            case ADD_COMMENT_SUCCESS: {

                // 이 부분은 나중에 쿼리로 한방에 해결!
                /*const postIdx = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                const post = {...state.mainPosts[postIdx]};
                post.Comments = [dummyComment(action.data.content), ...post.Comments];

                const mainPosts = [...state.mainPosts]
                mainPosts[postIdx] = post;*/

                /* immer 사용 했을때 */
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Comments.unshift(action.data);
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;

            }
            case ADD_COMMENT_FAILURE: {
                draft.CommentLoading = false;
                draft.CommentError = action.error;
                break;
            }

            case REMOVE_POST_REQUEST: {
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            }
            case REMOVE_POST_SUCCESS: {
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId); // data 가 아이디
                break;
            }
            case REMOVE_POST_FAILURE: {
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            }
            default:
                break;
        }
    });

}

export default reducer;

export class LOAD_POST_REQUESTS {
}
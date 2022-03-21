import shortid from 'shortid';
import {ADD_POST_TO_ME} from "./user";

export const initialState = {
    mainPosts: [ // 더미 데이터
        {
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
        },
    ],
    imagePaths: [], // <-- 이미지 업로드시 경로 저장

    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
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

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

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



const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST_REQUEST: {
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        }
        case ADD_POST_SUCCESS: {
            return {
                ...state,
                //mainPosts: [...state.mainPosts, dummyData]
                mainPosts: [dummyData(action.data), ...state.mainPosts], // 순서 주의 data 먼저 넣어야 앞에 추가
                addPostLoading: false,
                addPostDone: true,
            };
        }
        case ADD_POST_FAILURE: {
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        }

        case ADD_COMMENT_REQUEST: {
            return {
                ...state,
                addCommentLoading: true,
                addCommentError: null,
                addCommentDone: false,
            }
        }
        case ADD_COMMENT_SUCCESS: {

            // 이 부분은 나중에 쿼리로 한방에 해결!
            const postIdx = state.mainPosts.findIndex((v) => v.id === action.data.postId);
            const post = {...state.mainPosts[postIdx]};
            post.Comments = [dummyComment(action.data.content), ...post.Comments];

            const mainPosts = [...state.mainPosts]
            mainPosts[postIdx] = post;
            return {
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone: true,
            };
        }
        case ADD_COMMENT_FAILURE: {
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }
        }


        case REMOVE_POST_REQUEST: {
            return {
                ...state,
                removePostLoading: true,
                removePostDone: false,
                removePostError: null,
            }
        }
        case REMOVE_POST_SUCCESS: {
            return {
                ...state,
                mainPosts: state.mainPosts.filter((v) => v.id !== action.data), // data 가 아이디
                removePostLoading: false,
                removePostDone: true,
            };
        }
        case REMOVE_POST_FAILURE: {
            return {
                ...state,
                removePostLoading: false,
                removePostError: action.error,
            }
        }
        default:
            return state;
    }
}

export default reducer;
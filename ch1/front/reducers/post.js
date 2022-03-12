export const initialState = {
    mainPosts: [ // 더미 데이터
        {
            id: 1,
            User: {id: 1, nickname: '테스터1'},
            content: '테스트 글입니당!1 ',
            Images: [
                {src: 'https://gimg.gilbut.co.kr/book/BN003341/rn_view_BN003341.jpg'},
                {src: 'https://gimg.gilbut.co.kr/book/BN003330/rn_view_BN003330.jpg'},
                {src: 'https://gimg.gilbut.co.kr/book/BN003311/rn_view_BN003311.jpg'},
            ],
            Comments: [
                {User: {nickname: '댓글러1-1'}, content: '코멘트 1-1'},
                {User: {nickname: '댓글러1-2'}, content: '코멘트 1-2'}
            ]
        },
        {
            id: 2,
            User: {id: 2, nickname: '테스터2'},
            content: '테스트 글입니당!2',
            Images: [
                {src: 'https://gimg.gilbut.co.kr/book/BN003341/rn_view_BN003341.jpg'},
                {src: 'https://gimg.gilbut.co.kr/book/BN003330/rn_view_BN003330.jpg'},
                {src: 'https://gimg.gilbut.co.kr/book/BN003311/rn_view_BN003311.jpg'},
            ],
            Comments: [
                {User: {nickname: '댓글러2-1'}, content: '코멘트 2-1'},
                {User: {nickname: '댓글러2-2'}, content: '코멘트 2-2'}
            ]
        },
        {
            id: 3,
            User: {id: 3, nickname: '테스터3'},
            content: '테스트 글입니당!3',
            Images: [
                {src: 'https://gimg.gilbut.co.kr/book/BN003341/rn_view_BN003341.jpg'},
                {src: 'https://gimg.gilbut.co.kr/book/BN003330/rn_view_BN003330.jpg'},
                {src: 'https://gimg.gilbut.co.kr/book/BN003311/rn_view_BN003311.jpg'},
            ],
            Comments: [
                {User: {nickname: '댓글러3-1'}, content: '코멘트 3-1'},
                {User: {nickname: '댓글러3-2'}, content: '코멘트 3-2'}
            ]
        },
        {
            id: 4,
            User: {id: 4, nickname: '테스터4'},
            content: '테스트 글입니당!4',
            Images: [
                {src: 'https://gimg.gilbut.co.kr/book/BN003341/rn_view_BN003341.jpg'},
                {src: 'https://gimg.gilbut.co.kr/book/BN003330/rn_view_BN003330.jpg'},
                {src: 'https://gimg.gilbut.co.kr/book/BN003311/rn_view_BN003311.jpg'},
            ],
            Comments: [
                {User: {nickname: '댓글러4-1'}, content: '코멘트 4-1'},
                {User: {nickname: '댓글러4-2'}, content: '코멘트 4-2'}
            ]
        },
    ],
    imagePaths: [], // <-- 이미지 업로드시 경로 저장
    postAdded: false, // <-- 게시글 추가 완료 되었을때
};

const dummyData = {
    id: 5,
    User: {id: 1, nickname: '테스터1'},
    content: '추가 글 등록',
    Images: [],
    Comments: []
}

export const ADD_POST = 'ADD_POST';

export const addPostAction = () => {
    return {
        type: ADD_POST,

    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                //mainPosts: [...state.mainPosts, dummyData]
                mainPosts: [dummyData, ...state.mainPosts], // 순서 주의 data 먼저 넣어야 앞에 추가
                postAdded: true,
            };
        }
        default:
            return state;
    }
}

export default reducer;
import React, {useEffect} from 'react'; //<-- 넥스트에서는 이 구문이 필요가 없음
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import {useDispatch, useSelector} from "react-redux";
import PostCard from "../components/PostCard";
import {LOAD_POSTS_REQUEST} from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";
import { END } from 'redux-saga';
import axios from "axios";

/*
* Next 가 알아서 페이지 라우팅 까지 해줌!
*
* */
const Home = () => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post );

    useEffect(() => {

        if ( retweetError ) {
            return alert(retweetError);
        }

    }, [retweetError])

    // SSR 방식으로 변경
    /*useEffect(() => { // componentDidMount 효과
        dispatch({
           type: LOAD_MY_INFO_REQUEST,
        });
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);*/

    // 스크롤이 아래로 갔을때 불러옴
    useEffect(() => {
        function onScroll() {
            // 높이 잴때 보통 이거 많이 씀
            // scrollY: 얼마나 내렸는지
            // clientHeight: 화면 보이는 길이
            // scrollHeight: 총 길이
            // scrollY + clientHeight = scrollHeight
            //console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);

            if ( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300 ) {
                if ( hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }

        window.addEventListener('scroll', onScroll);

        return () => { // 꼭 해제 해줘야 함
            window.removeEventListener('scroll', onScroll);
        }
    }, [ hasMorePosts, loadPostsLoading, mainPosts ]);




    return (
        <AppLayout> {/* AppLayout 안쪽이 children */}
            { me && <PostForm />} {/* 로그인 한 사람만 보여야함 */}
            { mainPosts.map((post, index) => <PostCard  key={ post.id } post={ post }/>) }
       </AppLayout>
    )
}

/* 이부분이 Home 보다 먼저 실행 됨 */
// 여기는 서버 쪽에서 실행
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // context 안에 store 들어 있음~

    console.log('getServerSideProps start');
    console.log(context.req.headers);

    /**
     * 이부분 중요함! [프런트 서버에서 쿠키가 공유 되는 이슈!!]
     * 서버에서 실행 되는 것이기 때문에 다른 사람이 요청해도 내가 요청한것 처럼 되어버릴수 있음
     * 요청이 서버일 경우에만 쿠키를 잠깐 넣어두는 방법으로 해결!
     */
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });

    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
});

export default Home;
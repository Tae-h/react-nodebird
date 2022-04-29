import React, {useEffect} from 'react'; //<-- 넥스트에서는 이 구문이 필요가 없음
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import {useDispatch, useSelector} from "react-redux";
import PostCard from "../components/PostCard";
import {LOAD_POSTS_REQUEST} from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";

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

    useEffect(() => { // componentDidMount 효과
        dispatch({
           type: LOAD_MY_INFO_REQUEST,
        });
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

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

export default Home;
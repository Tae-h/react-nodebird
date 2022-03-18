import React from 'react'; //<-- 넥스트에서는 이 구문이 필요가 없음
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import {useSelector} from "react-redux";
import PostCard from "../components/PostCard";

/*
* Next 가 알아서 페이지 라우팅 까지 해줌!
*
* */
const Home = () => {

    const { me } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post );

    return (
        <AppLayout> {/* AppLayout 안쪽이 children */}
            { me && <PostForm />} {/* 로그인 한 사람만 보여야함 */}
            { mainPosts.map((post, index) => <PostCard  key={ post.id } post={ post }/>) }
        </AppLayout>
    )
}

export default Home;
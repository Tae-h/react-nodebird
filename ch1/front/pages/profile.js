import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import Router from "next/router";
import useSWR from 'swr';
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";
import axios from "axios";
import {END} from "redux-saga";

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);


const Profile = () => {
    const dispatch = useDispatch();
    const [followingsLimit, setFollowingsLimit] = useState(3);
    const [followersLimit, setFollowersLimit] = useState(3);
    const { data: followingsData, error: followingError } = useSWR(`http://localhost:3060/user/followings?limit=${followingsLimit}`, fetcher);
    const { data: followersData, error: followerError } = useSWR(`http://localhost:3060/user/followers?limit=${followersLimit}`, fetcher);

    const { me } = useSelector((state) => state.user);


    /*useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST
        });
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
        });

    }, [])*/

    useEffect(() => {
        if ( !(me && me.id) ) {
            Router.push('/');
        }
    }, [me && me.id]);

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    }, []);

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    }, []);

    if ( !me ) {
        return '내 정보 로딩중...';
    }

    if (followerError || followingError) {
        console.error(followerError || followingError);
        return '팔로잉/팔로워 로딩 중 에러가 발생했습니다.';
    }



    return (
        <>
            <Head>
                <title> 내 프로필 | 노드버드 </title>
            </Head>
            <AppLayout>
                <NicknameEditForm />

                <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingError && !followingsData} />
                <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followerError && !followersData} />
            </AppLayout>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);

    await context.store.sagaTask.toPromise();
});

export default Profile;
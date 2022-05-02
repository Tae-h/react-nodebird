import {Avatar, Button, Card} from 'antd';
import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import { logoutRequestAction} from "../reducers/user";
import Link from 'next/link';

const UserProfile = () => {

    const dispatch = useDispatch();

    const { me, logoutLoading } = useSelector((state) => state.user);

    const onLogout = useCallback(() => {
        dispatch( logoutRequestAction() );
    }, []);

    return (
        <>
            <Card
                actions={[
                    <div key="twit" >
                        <Link href={`/user/${me.id}`}>
                            <a>짹짹<br/>{me?.Posts?.length}</a>
                        </Link>
                    </div>,
                    <div key="followings" >
                        <Link href="/profile">
                          <a>팔로잉<br/>{me && me.Followings?.length }</a>
                        </Link>
                    </div>,
                    <div key="followers" >
                        <Link href="/profile">
                            <a>팔로워<br/>{me && me.Followers?.length }</a>
                        </Link>
                    </div>
                ]}
            >
                <Card.Meta
                    avatar={
                        <Link href={`/user/${me.id}`} prefetch={false}>
                            <a>
                                <Avatar>{me?.nickname[0]}</Avatar>
                            </a>
                        </Link>
                    }
                    title={me?.nickname}
                />
                <Button onClick={ onLogout } loading={ logoutLoading }>로그아웃</Button>
            </Card>
        </>
    )
}

export default UserProfile;
import {Avatar, Button, Card} from 'antd';
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {loginAction, logoutAction} from "../reducers/user";

const UserProfile = () => {

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch( logoutAction() );
    }, []);

    return (
        <>
            <Card
                actions={[
                    <div key="twit" >짹짹<br/>0</div>,
                    <div key="followings" >팔로잉<br/>0</div>,
                    <div key="followers" >팔로워<br/>0</div>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>T.H</Avatar>}
                    title="Tae-h"
                />
                <Button onClick={onLogout}>로그아웃</Button>
            </Card>
        </>
    )
}

export default UserProfile;
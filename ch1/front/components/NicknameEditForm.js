import {Form, Input} from "antd";
import {useCallback, useMemo} from "react";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import useInput from "../hooks/useInput";
import {CHANGE_NICKNAME_REQUEST} from "../reducers/user";


const NicknameEditForm = () => {

    const style = useMemo(() => ({
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '30px'
    }), [])

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [nickname, onChangeNickname] = useInput(me?.nickname || '');

    const onSubmit = useCallback(() => {

        if ( !nickname ) {
            return alert('닉네임을 입력해 주세요.!');
        }

        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        });
    }, [nickname]);

    return (
        <>
            <Form style={style}>
                <Input.Search
                    value={nickname}
                    onChange={onChangeNickname}
                    addonBefore="닉네임"
                    enterButton="수정"
                    onSearch={onSubmit}
                />

            </Form>
        </>
    )
}

export default NicknameEditForm;
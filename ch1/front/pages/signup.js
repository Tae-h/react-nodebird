import AppLayout from "../components/AppLayout";
import Head from "next/head";
import {Button, Checkbox, Form, Input} from "antd";
import {memo, useCallback, useState} from "react";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {SIGN_UP_REQUEST} from "../reducers/user";


const ErrorMessage = styled.div`
  color: red;
`;

const Signup = memo(() => {

    const dispatch = useDispatch();
    const { signUpLoading  } = useSelector((state) => state.user);

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);


    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, [term]);


    const onSubmit = useCallback(() => {
        if ( password !== passwordCheck ) {
            return setPasswordError(true);
        }

        if ( !term ) {
            return setTermError(true);
        }
        console.log(email, nickname, password);

        dispatch({
            type: SIGN_UP_REQUEST,
            data: {email, nickname, password},
        });
    }, [email, password, passwordCheck, term]);

    return (
        <>
            <AppLayout>
                <Head>
                    <title>
                        회원가입 | 노드버드
                    </title>
                </Head>
                <Form onFinish={ onSubmit }>
                    <div>
                        <label htmlFor="user-email">아이디</label>
                        <br/>
                        <Input name="user-email" type="email"  value={email} required onChange={onChangeEmail}/>
                    </div>
                    <div>
                        <label htmlFor="user-nickname">닉네임</label>
                        <br/>
                        <Input name="user-nickname" value={nickname} required onChange={onChangeNickname}/>
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br/>
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                    </div>

                    <div>
                        <label htmlFor="user-password-check">비밀번호 체크</label>
                        <br/>
                        <Input name="user-password-check"
                               type="password"
                               value={passwordCheck}
                               required
                               onChange={onChangePasswordCheck}/>
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </div>

                    <div>
                        <Checkbox name="user-term" checked={ term } onChange={ onChangeTerm }>내 말을 잘 들을 것을 동의 합니다.</Checkbox>
                        {termError && <ErrorMessage>약관에 동의 하셔야 합니다.</ErrorMessage>}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                    </div>

                </Form>
            </AppLayout>
        </>
    )
});

export default Signup;
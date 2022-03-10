import {Button, Form, Input} from 'antd';
import {useCallback, useMemo, useState} from "react";
import Link  from 'next/link';
import styled from 'styled-components';
import PropTypes from "prop-types";
import useinput from "../hooks/useInput";
import useInput from "../hooks/useInput";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`
const FormWrapper = styled(Form)`
      padding: 10px;
    `;
const LoginForm = ({ setIsLoggedIn }) => {

    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');


    /* useMemo 값을 캐싱 하기 때문에 이렇게도 많이 사용! */
    //const styled = useMemo(() => ({marginTop: 10}), []);

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        setIsLoggedIn(true);
    }, [id, password]);




    return (
        <>
            <FormWrapper onFinish={ onSubmitForm }> {/* onFinish 는 e.preventDefault 가 적용 되어있음! */}
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br/>
                    <Input name="user-id" value={ id }  onChange={ onChangeId } required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input
                        name="user-password"
                        type="password"
                        value={ password }
                        onChange={ onChangePassword }
                        required />
                </div>
                <ButtonWrapper>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={false}
                    >
                        로그인
                    </Button>
                    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                </ButtonWrapper>

            </FormWrapper>
        </>
    )
}

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
}

export default LoginForm;
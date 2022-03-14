import PropTypes from 'prop-types';
import Link from 'next/link'; // 넥스트에서 지원
import { Menu, Input, Row, Col } from 'antd';
import {memo, useState} from "react";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled, {createGlobalStyle} from "styled-components";
import {useSelector} from "react-redux"; // 리액트랑 리덕스랑 연결

/* styled-components 로 빼면 리렌더링이 되지 않음 */
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const AppLayout = memo(( { children } ) => {

    //const [isLoggedIn, setIsLoggedIn] = useState(false); //<-- 이제 리덕스 중앙
    //const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const { isLoggedIn } = useSelector((state) => state.user); // 취향 차이

    return (
        <div>
            <Global/>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6} >
                    { isLoggedIn ? <UserProfile /> : <LoginForm /> }
                </Col>
                <Col xs={24} md={12} >
                    { children }
                </Col>
                <Col xs={24} md={6} >
                    {/* target _blank를 사용 할때는 noreferrer noopener 꼭 써줘야 함 보안 위험떄문에 새창을 누가 열었는지 정보 없앰  */}
                    <a href="https://www.naver.com" target="_blank" rel="noreferrer noopener">네이버</a>
                </Col>
            </Row>
        </div>
    )

});

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;
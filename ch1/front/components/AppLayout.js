import PropTypes from 'prop-types';
import Link from 'next/link'; // 넥스트에서 지원
import { Menu, Input, Row, Col } from 'antd';
import {useState} from "react";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const AppLayout = ( { children } ) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }}/>
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
                    {/* target _blank를 사용 할때는 noreferrer noopener 꼭 써줘야 함 보안 위험떄문에 */}
                    <a href="https://www.naver.com" target="_blank" rel="noreferrer noopener">네이버</a>
                </Col>
            </Row>
        </div>
    )

};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;
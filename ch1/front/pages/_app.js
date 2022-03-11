import 'antd/dist/antd.css';
import PropTypes from "prop-types";
import Head from 'next/head';
import wrapper from "../store/configureStore"; // 넥스트에서 헤드를 수정 할수 있게 컴포넌트를 지원 해줌

const NodeBird = ({ Component }) => {
    return (
        <>
            {/* provider 로 감쌀 필요 없음 --> 알아서 감싸짐 */}
            <Head>
                <meta charSet="utf-8" />
                <title>노드버드</title>
            </Head>
            <Component />
        </>
    )
}

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird);
/*
* _app.js 는 pages 들의 공통 부분
* */
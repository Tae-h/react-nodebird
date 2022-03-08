import React from 'react'; //<-- 넥스트에서는 이 구문이 필요가 없음
import AppLayout from "../components/AppLayout";

/*
* Next 가 알아서 페이지 라우팅 까지 해줌!
*
* */
const Home = () => {
    return (
        <AppLayout> {/* AppLayout 안쪽이 children */}
            <div>Hello!, Next.js</div>
        </AppLayout>
    )
}

export default Home;
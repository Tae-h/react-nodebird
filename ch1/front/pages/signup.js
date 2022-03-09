import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Signup = () =>{

    return (
        <>
            <Head>
                <title>
                    회원가입 | 노드버드
                </title>
            </Head>
            <AppLayout>
                <div>회원 가입</div>
            </AppLayout>
        </>
    )
}

export default Signup;
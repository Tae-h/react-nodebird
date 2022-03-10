import {Form, Input} from "antd";
import {useMemo} from "react";
import PropTypes from 'prop-types';


const NicknameEditForm = () => {

    const style = useMemo(() => ({
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '30px'
    }), [])

    return (
        <>
            <Form style={style}>
                <Input.Search addonBefore="닉네임" enterButton="수정"/>

            </Form>
        </>
    )
}

export default NicknameEditForm;
import {Button, Form, Input} from "antd";
import {useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { addPostAction} from "../reducers/post";

const PostForm = () => {

    const { imagePaths } = useSelector((state) => state.post);

    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        dispatch( addPostAction() );
        setText('');
    }, []);

    const [text, setText] = useState('');

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, [text]);

    const imageFileInput = useRef(null);

    const onClickImageFileUpload = useCallback(() => {
        imageFileInput.current.click();
    }, [imageFileInput.current]);

    return (
        <>
            <Form style={{ margin: '10px 0 20px' }}
                  encType="multipart/form-data"
                  onFinish={onSubmit}
            >
                <Input.TextArea value={text} onChange={onChangeText}
                    maxLength={140}
                    placeholder="무슨일이 있었나요?"
                />
                <div>
                    <input type="file" multiple hidden ref={imageFileInput}/>
                    <Button onClick={onClickImageFileUpload}>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType={"submit"}>쨱!!</Button>
                </div>
                <div>
                    { imagePaths.map((v) => (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={v} style={{ width: '200px' }} alt={v}/>
                            <div>
                                <Button>제거</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Form>
        </>
    )
}

export default PostForm;
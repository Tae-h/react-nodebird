import {Button, Form, Input} from "antd";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { addPostAction} from "../reducers/post";

const PostForm = () => {

    const dispatch = useDispatch();
    const { imagePaths, addPostDone } = useSelector((state) => state.post);
    const [text, setText] = useState('');

    useEffect(() => {
        /* 포스트 추가 완료 되면  */
        if ( addPostDone ) {
            setText('');
        }
    }, [addPostDone]);


    const onSubmit = useCallback(() => {
        dispatch( addPostAction(text) );
    }, [text]);


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
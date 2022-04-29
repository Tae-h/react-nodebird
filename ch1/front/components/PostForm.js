import {Button, Form, Input} from "antd";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ADD_POST_REQUEST, addPostAction, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST} from "../reducers/post";

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
        //dispatch( addPostAction(text) );
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();

        imagePaths.forEach((p) => {
            formData.append('image', p);
        });

        formData.append('content', text);
        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);


    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, [text]);

    const imageFileInput = useRef(null);

    const onClickImageFileUpload = useCallback(() => {
        imageFileInput.current.click();
    }, [imageFileInput.current]);

    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        });
    }, []);

    return (
        <>
            <Form style={{ margin: '10px 0 20px' }}
                  encType="multipart/form-data"
                  onFinish={onSubmit}
            >
                <Input.TextArea
                    value={text}
                    onChange={ onChangeText }
                    maxLength={140}
                    placeholder="무슨일이 있었나요?"
                />
                <div>
                    <input type="file" name={'image'} multiple hidden ref={ imageFileInput } onChange={onChangeImages}/>
                    <Button onClick={ onClickImageFileUpload }>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType={"submit"}>짹!!</Button>
                </div>
                <div>
                    { imagePaths.map((v, index) => (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={`http://localhost:3060/${v}`} style={{ width: '200px' }} alt={v} />
                            <div>
                                <Button onClick={ onRemoveImage(index) }>제거</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Form>
        </>
    )
}

export default PostForm;
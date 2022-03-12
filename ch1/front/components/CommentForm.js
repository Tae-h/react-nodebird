import {Button, Form, Input} from "antd";
import {useCallback, useState} from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const CommentForm = ({post}) => {

    // 댓글 작성자 아이디
    const id = useSelector((state) => state.user.me?.id);
    const [commentText, onChangeCommentText] = useInput('');

    const onSubmitComment = useCallback(() => {
        console.log('부모글 번호: ',post.id, commentText)
    }, [commentText]);

    return (
        <>
            <Form onFinish={onSubmitComment}>
               <Form.Item style={{ position: 'relative', margin: 0 }}>
                   <Input.TextArea value={commentText}
                                   onChange={onChangeCommentText}
                                   rows={4}
                   />
                   <Button
                       style={{ position: 'absolute', right: 0, bottom: -40 }}
                       type={"primary"}
                       htmlType={"submit"}>코멘트 등록!</Button>
               </Form.Item>

            </Form>
        </>
    )
}

CommentForm.propTypes = {
    CommentForm: PropTypes.object.isRequired,
}

export default CommentForm;
import {Button, Form, Input} from "antd";
import {useCallback, useEffect, useState} from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {ADD_COMMENT_REQUEST, ADD_POST_REQUEST} from "../reducers/post";

const CommentForm = ({post}) => {

    const dispatch = useDispatch();

    // 댓글 작성자 아이디
    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDone } = useSelector((state) => state.post);

    //const email = useSelector((state) => state.user.me?.email);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);

    /*const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    },[commentText]);*/

    const onSubmitComment = useCallback(() => {
        console.log('부모글 아이디: ', post.id, commentText)

        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id }
        })
    }, [commentText, id]);

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
    post: PropTypes.object.isRequired,
}

export default CommentForm;
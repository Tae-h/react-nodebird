import {Avatar, Button, Card, Comment, Image, List, Popover} from "antd";
import Connect from "react-redux/lib/connect/connect";
import {useDispatch, useSelector} from "react-redux";
import {EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import PostImages from "./PostImages";
import {useCallback, useEffect, useState} from "react";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import {LIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST} from "../reducers/post";
import FollowButton from "./FollowButton";
import Link from "next/link";
import moment from 'moment';

moment.locale('ko'); // 한글 설정
// 참조 momentjs.com

const PostCard = ({ post }) => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const id = me?.id;

    const { addPostDone, mainPosts, removePostLoading, retweetError} = useSelector((state) => state.post);

    //const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);




    const onLike = useCallback((e) => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }

        return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        })
    }, [id]);

    const onUnlike = useCallback((e) => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }

        return dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
        })
    }, [id]);

    const onToggleComment = useCallback((e) => {
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onRemovePost = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id
        });
    }, []);

    const onRetweet = useCallback(() => {
        if ( !id ) {
            return alert('로그인이 필요합니다.');
        }

        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [id]);

    const liked = post.Likers.find((v) => v.id === id);

    return (
        <>
            <div style={{ marginBottom: 20 }}>
                <Card
                    cover={post.Images[0] && <PostImages images={post.Images}/>}
                    actions={[ /* 배열안에 jsx 를 넣을 때는 항상 key 값을 넣어줘야 함 */
                        <RetweetOutlined key={"retweet"} onClick={ onRetweet }/>,
                        liked ? <HeartTwoTone  twoToneColor={"#eb2f96"} key={"heart"} onClick={ onUnlike }/>
                                : <HeartOutlined key={"heart"} onClick={onLike}/>
                        ,
                        <MessageOutlined key={"comment"} onClick={onToggleComment}/>,
                        <Popover key="more" content={[
                            <Button.Group>
                                {(id && post.User.id === id) ? (
                                    <>
                                        <Button key={"modify_" + post.id}>수정</Button>
                                        <Button key={"delete_" + post.id}
                                                type="danger"
                                                loading={ removePostLoading }
                                                onClick={ onRemovePost }
                                        >
                                            삭제
                                        </Button>
                                    </>)
                                 : <Button key={"report_" + post.id}>신고</Button>
                                }
                            </Button.Group>
                        ]}>
                            <EllipsisOutlined />
                        </Popover>
                    ]}
                    title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                    extra={id && <FollowButton post={post}/>}
                >
                    {post.RetweetId && post.Retweet
                        ? (
                            <Card
                                cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
                            >
                                <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</span>
                                <Card.Meta
                                    avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
                                    title={post.Retweet.User.nickname}
                                    description={<PostCardContent postData={post.Retweet.content} />}
                                />
                            </Card>
                        )
                        : (
                            <>
                                <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</span>
                                <Card.Meta
                                    avatar={
                                        <Link href={`/user/${post.User.id}`}>
                                            <a>
                                                <Avatar>{post.User.nickname[0]}</Avatar>
                                            </a>
                                        </Link>
                                    }
                                    title={post.User.nickname}
                                    description={<PostCardContent postData={post.content} />}
                                />
                            </>
                        )
                    }

                </Card>


                {commentFormOpened && (
                    <div>
                        <CommentForm post={post}/> {/* 게시글의 아이디가 필요해서 넘김 */}
                        <List
                            header={`${post.Comments.length}개의 댓글`}
                            itemLayout={"horizontal"}
                            dataSource={post.Comments}
                            renderItem={(item) => (
                                <li>
                                    <Comment
                                        author={item.User.nickname}
                                        avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                        content={item.content}
                                    />
                                </li>
                            )}
                        />
                    </div>
                )}
            </div>
        </>
    )
}



PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
        Likers: PropTypes.arrayOf(PropTypes.object),
        RetweetId: PropTypes.number,
        Retweet: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
};

export default PostCard;
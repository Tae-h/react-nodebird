import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {FOLLOW_REQUEST, UNFOLLOW_REQUEST} from "../reducers/user";

const FollowButton= memo(({ post }) => {
    const dispatch = useDispatch();
    const { me, followLoading, unFollowLoading } = useSelector((state) => state.user);

    // 팔로잉 여부
    const isFollowing = me?.Followings?.find((v) => v.id === post.User.id);

    const onClickFollow = useCallback(() => {

        if ( isFollowing ) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            });
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            });
        }
    }, [isFollowing]);

    return (
        <Button onClick={ onClickFollow }
                loading={followLoading || unFollowLoading}
        >
            { isFollowing ? '언팔로우' : '팔로우'}
        </Button>

    );
});

FollowButton.propTypes = {
    //post: PropTypes.object.isRequired,
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
}

export default FollowButton;
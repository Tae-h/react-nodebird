const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { Post, Image, Comment, User, Hashtag } = require('../models');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {

    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });

        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // 댓글 작성자
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User, // 게시글 작성자
                attributes: ['id', 'nickname'],
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }]
        })

        res.status(201).json(fullPost);
    } catch (e) {
        console.error(e);
        next(e);
    }

});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {

    try {
        /* 실제 존재하는 글인지 확인 */
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });

        if ( !post ) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }

        const comment = await Comment.create({
            PostId: parseInt(req.params.postId, 10), // req.body.postId 도 가능
            content: req.body.content,
            UserId: req.user.id,
        });

        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })

        res.status(201).json(fullComment);
    } catch (e) {
        console.error(e);
        next(e);
    }

});


router.delete('/', (req, res) =>{

})

module.exports = router;
const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { Post, Image, Comment, User, Hashtag } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {

    try {
        const where = {};

        if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        }

        const posts = await Post.findAll({
            where,
            limit: 10,
            //offset: 0, // 1~ 10 게시물, 10--> 11 ~ 20 게시 이방식은 잘 안씀
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            },
            {
                model: Image,
            },
            {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }],
        });

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }

});



module.exports = router;
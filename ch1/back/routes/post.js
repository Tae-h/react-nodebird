const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { Post, Image, Comment, User, Hashtag } = require('../models');
const multer = require('multer');
const path = require("path");
const fs = require('fs');
const router = express.Router();

try {
    fs.accessSync('uploads');
} catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) { // 제로초.png
            const ext = path.extname(file.originalname); // 확장자 추출(.png)
            const basename = path.basename(file.originalname, ext); // 제로초
            done(null, basename + '_' + new Date().getTime() + ext); // 제로초15184712891.png
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB 업로드 제한
});


// 이미지 안넣어도 됨
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {

    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g); // 해시태그 정규식
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });

        if ( hashtags ) {
            // 없을때만 등록
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            }))); // [[노드, true], [리액트, true]]
            await post.addHashtags(result.map((v) => v[0]));
        }

        if (req.body.image) {
            /* 이미지가 여러개일 경우 */
            if (Array.isArray(req.body.image)) { // 이미지를 여러 개 올리면 image: [test1.png, test2.png]

                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                await post.addImages(images); // 배열로 여러개 등록 s

            /* 이미지가 하나일 경우 */
            } else { // 이미지를 하나만 올리면 image: 제로초.png

                const image = await Image.create({ src: req.body.image });
                await post.addImages(image); // 하나만
            }
        }

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

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }

        await post.addLikers(req.user.id); // addLikers 시퀄라이즈에서 자동으로 생성
        res.json({ PostId: post.id, UserId: req.user.id });

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }

        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });

    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.delete('/:postId/', isLoggedIn, async (req, res, next) => { // DELETE /post
    try {
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id,
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/* 이미지를 한장만 올린다면 --> upload.single('image') */
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
    console.log(req.files);
    console.log('dasdasdasd');
    res.json(req.files.map((v) => v.filename));
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { // POST /post/1/retweet
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [{
                model: Post,
                as: 'Retweet',
            }],
        });

        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }

        if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
            return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
        }

        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId,
            },
        });

        if (exPost) {
            return res.status(403).send('이미 리트윗했습니다.');
        }
        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet',
        });

        const retweetWithPrevPost = await Post.findOne({
            where: { id: retweet.id },
            include: [{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }],
        })

        res.status(201).json(retweetWithPrevPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;
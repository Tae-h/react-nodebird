const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Op } = require('sequelize');

const router = express.Router();


// GET user 정보
// 모든 요청을 보낼때 요청함..?
router.get('/', async (req, res, next) => {

    try {
        console.log(req.headers);
        if ( req.user ) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: { // 비밀번호 제외
                    exclude: ['password']
                },
                include: [{ // join 한 데이터 가져옴
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            });

            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }

    } catch (e) {
        console.error(e);
        next(e);
    }

});

router.get('/:id', async (req, res, next) => { // GET /user/3
    try {
        const fullUserWithoutPassword = await User.findOne({
            where: { id: req.params.id },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Post,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        })
        if (fullUserWithoutPassword) {
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length;
            data.Followings = data.Followings.length;
            data.Followers = data.Followers.length;
            res.status(200).json(data);
        } else {
            res.status(404).json('존재하지 않는 사용자입니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// login --> /user/login
router.post('/login', isNotLoggedIn, async (req, res, next) => {
    /* 미들웨어 확장 */
    passport.authenticate('local', (err, user, info) => {
        // server err!!
        if ( err ) {
            console.error(err);
            return next(err);
        }

        // client err!!
        if ( info ) {
            return res.status(401).send(info.reason);
        }
        // passport login 실행!
        return req.login(user, async (loginErr) => {
            if ( loginErr ) {
                console.error('에러!!', loginErr);
                return next(loginErr); // next 안에 err가 있으면 에러처리 미들웨어로 감
            }

            // 시퀄라이즈가 알아서 join 해서 select 해줌!! 그래서 편함... 하지만 mybatis 가 난 더 편함!!
            const fullUserWithoutPassword = await User.findOne({
                where: {
                    id: user.id,
                },
                attributes:
                    { exclude: ['password'] }, // password 만 빼고!! select
                    //[  'id', 'email', 'nickname'],  // select columns 부분
                include: [{
                    model: Post,
                }, {
                    model: User,
                    as: 'Followings'
                }, {
                    model: User,
                    as: 'Followers',
                }]
            })
            return res.status(200).json(fullUserWithoutPassword); // success 일 경우 전달!!
        });
    }) (req, res, next);
});


router.post('/logout', isLoggedIn, async (req, res, next) => {
    //req.user <-- 정보를 들고 있음
    req.logout();
    req.session.destroy();
    res.send('logout ok!');
})


// default 회원가입
router.post('/signup',  isNotLoggedIn, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });

        if ( exUser ) {
            return res.status(403).send('이미 사용중인 아이디 입니다.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12); // 암호화된 패스워드, 뒤 숫자는 높을 수록 보안이 쌔짐
        await User.create({
            email: req.body.email, // req.body .. 는 그냥 쓸수 있는게 아님! app.js 에서 설정
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        //res.setHeader('Access-Control-Allow-Origin', '*');// 전체 허용
        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // 서버가 3000 포트 하용 해줌
        res.status(200).send('signUp ok!');
    } catch (e) {
        console.error(e);
        next(e); // 브라우저로 보여줌
    }

});

/* 닉네임 수정 */
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id },
        });
        console.log("변경된 닉네임!! ", req.body.nickname);
        res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/* 팔로우 */
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});

        if ( !user ) {
            res.status(403).send('존재하지 않는 사람입니다');
        }

        await user.addFollowers(req.user.id);

        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/* 언팔로우 */
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});

        if ( !user ) {
            res.status(403).send('존재하지 않는 사람입니다');
        }

        await user.removeFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
    try {
        const user = await User.findOne({ where: { id: req.user.id }});

        if ( !user ) {
            res.status(403).send('없는 사람을 찾으려고 하시네요?');
        }

        const followers = await user.getFollowers({
            attributes: ['id', 'nickname'],
            //limit: parseInt(req.query.limit, 10),
        });

        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
    try {
        const user = await User.findOne({ where: { id: req.user.id }});

        if ( !user ) {
            res.status(403).send('없는 사람을 찾으려고 하시네요?');
        }

        const followings = await user.getFollowings({
            attributes: ['id', 'nickname'],
            //limit: parseInt(req.query.limit, 10),
        });

        res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { // DELETE /user/follower/2
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if (!user) {
            res.status(403).send('없는 사람을 차단하려고 하시네요?');
        }
        await user.removeFollowings(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:id/posts', async (req, res, next) => { // GET /user/1/posts
    try {
        const user = await User.findOne({ where: { id: req.params.id }});
        if (user) {
            const where = {};
            if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
                where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
            } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
            const posts = await user.getPosts({
                where,
                limit: 10,
                include: [{
                    model: Image,
                }, {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname'],
                    }]
                }, {
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: User,
                    through: 'Like',
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
        } else {
            res.status(404).send('존재하지 않는 사용자입니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
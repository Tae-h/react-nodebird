const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');


const router = express.Router();

// login --> /user/login
router.post('/login', async (req, res, next) => {
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
            console.log(user);
            if ( loginErr ) {
                console.error('에러!!', loginErr);
                return next(loginErr);
            }
            return res.status(200).json(user); // success 일 경우 전달!!
        });
    }) (req, res, next);
});


router.post('/logout', async (req, res, next) => {
    //req.user <-- 정보를 들고 있음
    req.logout();
    req.session.destroy();
    res.send('logout ok!');
})


// default
router.post('/',  async (req, res, next) => {
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



module.exports = router;
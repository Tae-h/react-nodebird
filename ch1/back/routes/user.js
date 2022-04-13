const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');


const router = express.Router();

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
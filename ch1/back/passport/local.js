const passport = require('passport');

/* 구조분해 변수명 바꾸는 문법 { example: exp } */
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        }, async (email, password, done) => {
            try {
                const user = await User.findOne({
                    where: { email }
                })

                if ( !user ) {
                    return done(null, false, {reason: '존재하지 않는 사용자 아이디 입니다.'});
                }
                // 입력한 패스워드, db 저장된 패스워드
                const result = await bcrypt.compare(password, user.password);

                if ( result ) {
                    return done(null, user);
                } else {
                    return done(null, false, {reason: '비밀번호가 일치하지 않습니다.'});
                }
            } catch (err) {
                console.error(err);
                return done(err);
            }

        }));

}
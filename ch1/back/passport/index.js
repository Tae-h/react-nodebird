/* passport 설정 파일 */
const passport = require('passport');
const local = require('./local');
const { User }  = require('../models');

module.exports = () => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 라우터 접근시 deserializeUser 호출!
    passport.deserializeUser(async (id, done) => {
        // async 있으면 무조건 try catch!!
        try {
            const user = await User.findOne({
                where: { id }
            });

            done(null, user);
        } catch (err) {
            console.error(err);
            done(err);
        }

    });

    local();
}
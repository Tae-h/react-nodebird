

exports.isLoggedIn = (req, res, next) => {
    // isAuthenticated <-- passport 에서 제공!
    if ( req.isAuthenticated() ) {
        next(); // 인증되어 있으면 next --> 다음 미들웨어로
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
};
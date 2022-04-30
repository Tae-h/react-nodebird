/*
const http = require('http');

/!* 기본적인 원리 요 부분채 참고만 *!/
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    let index = 0;
    res.write('<h1>뭐뭐뭐 + index++ </h1>');
    res.write('뭐뭐뭐'+ index++);
    res.write('뭐뭐뭐'+ index++);
    res.write('뭐뭐뭐'+ index++);
    res.write('뭐뭐뭐'+ index++);
    res.end('Hello Node!'); // end 는 마지막에만
});

server.listen(3060, () => {
    console.log('server running on port 3060');
});*/

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const morgan = require('morgan');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');
const path = require("path");
dotenv.config();
const app = express();



db.sequelize.sync()
    .then(() =>{
        console.log("db 연결 성공!!");
    })
    .catch(console.error);

passportConfig();

/*
app.get --> 가져오다
app.post --> 생성하다
app.put --> 전체 수정
app.delete --> 제거
app.patch --> 부분 수정
app.options --> 찔러보기
app.head --> 안씀 헤더만 가져오기
*/
/**
 *  use 안에 들어가는 내용은 전부 미들웨어!!!
 */
app.use(morgan('dev'));
app.use(cors({
    //origin: 'http://localhost:3000',
    origin: true,
    credentials: true, // true: 쿠키까지 같이 전달
})); // 모든 요청에 res.setHeader('Access-Control-Allow-Origin', '*'); 를 넣어줌
app.use('/', express.static(path.join(__dirname, 'uploads'))); // os 별 경로 구분자 때문에 문자열 합치는거 안씀
app.use(express.json()); // axios 로 데이터 전소이 json 형태로 받겠다~
app.use(express.urlencoded( {extended: true} )); // 일반 폼 형태로 보낼시
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    res.send('Hello Express!');

});



/* router 분리 하기 */
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

/* 에러처리 미들웨어 */
app.use((err, req, res, next) => {

})

app.listen(3060, () => {
    console.log('express server running on port 3060!!!');
})

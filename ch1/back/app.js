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
const app = express();
const postRouter = require('./routes/post');
/*
app.get --> 가져오다
app.post --> 생성하다
app.put --> 전체 수정
app.delete --> 제거
app.patch --> 부분 수정
app.options --> 찔러보기
app.head --> 안씀 헤더만 가져오기
*/

app.get('/', (req, res) => {
    res.send('Hello Express!');

});

app.get('/posts', (req, res) => {
    res.json([
        {id: 1, content: 'Hello1'},
        {id: 2, content: 'Hello2'},
        {id: 3, content: 'Hello3'}
    ]);
});

/* router 분리 하기 */
app.use('/post', postRouter);


app.listen(3060, () => {
    console.log('express server running on port 3060');
})

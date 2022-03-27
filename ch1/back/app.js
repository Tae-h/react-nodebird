const http = require('http');

/* 기본적인 원리 요 부분은 참고만 */
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
});
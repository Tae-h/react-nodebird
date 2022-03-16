import {all, fork, call, put, take} from 'redux-saga/effects';
import axios from 'axios';
import postSaga from "./post";
import userSaga from "./user";



export default function* rootSaga() { // gen 함수 rootSaga.next() 를 해야 실행
    yield all([ // all: 배열 내에 있는 것을 모두 실행시킨다.
        // fork : 함수를 실행 시키는 함수, 비동기, call: fork 와 하는역할은 같으나 동기
        fork(userSaga),
        fork(postSaga),
    ])
}



/*
// 제너레이터 함수* 메모
const gen = function* () {

    console.log(1);
    yield; // 여기서 한번씩 멈춤
    console.log(2);
    yield ;
    console.log(3); // --> { value: undefined, done: false } 형식으로 리턴
    yield 4; // 숫자를 넣어서 리턴을 하면 --> { value: 4, done: false } 형식으로 리턴
}
const generator = gen();

generator.next() // 1
generator.next() // 2
generator.next() // 3*/

// 멈추지 않는 제너레이터
/*
let i = 0;
const gen2 = function* () {
    while (true) {
        yield i++;
    }
}

const g = gen2();
g.next();
*/




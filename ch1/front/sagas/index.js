import {func} from "prop-types";


export default function* rootSaga() { // gen 함수 rootSaga.next() 를 해야 실행

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

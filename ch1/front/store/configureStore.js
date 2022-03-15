import { createWrapper } from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
//import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import reducer from "../reducers";
import rootSaga from '../sagas';

const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
    console.log(action)
    return next(action);
}


const configureStore = () => {

    const sagaMiddleware = createSagaMiddleware(); //saga 미들웨어
    /* 적용한 미들 웨어 들 */
    //const middlewares = [thunkMiddleware, loggerMiddleware];
    const middlewares = [sagaMiddleware, loggerMiddleware ];

    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares)); // 개발용일 경우
    const store = createStore(reducer, enhancer);

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
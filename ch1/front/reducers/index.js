import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import {combineReducers} from "redux";


const initialState = {
    user: {

    },
    post: {

    },

};


// (이전상태, 다음상태) => 다음상태
// combineReducers reducers 합쳐줌
/*const rootReducer = combineReducers( {
    index: (state = {}, action) => {
        switch ( action.type ) {
            case HYDRATE: {
                console.log('HYDRATE', action);
                return {
                    ...state,
                    ...action.payload,
                }
            }
            default:
                return state;
        }
    },
    user,
    post,

});*/

// 아래 rootReducer 로 변경
const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log('HYDRATE', action);
            return action.payload;
        default: {
            const combinedReducer = combineReducers({
                user,
                post,
            });
            return combinedReducer(state, action);
        }
    }
};


export default rootReducer;
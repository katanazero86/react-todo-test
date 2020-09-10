import {combineReducers, createStore} from 'redux';
import todoReducer from  './modules/todo/index';

const rootReducer = combineReducers({
    todoReducer
});

const store = createStore(rootReducer);

export default store

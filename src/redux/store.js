import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import Rank from './Rank';
import UserInfo from './UserInfo';

let middleware = applyMiddleware();
const enhancer = compose(middleware);

// 整体的初始状态
// 就是把每个组件自己的初始状态组合起来, 注意key的名字和组件名一致
const initState = {
  Rank: Rank.initState,
  UserInfo: UserInfo.initState
};

// 定义reducer
// 每个组件自己的reducer负责维护自己的状态, 注意key的名字和组件名一致
const reducers = {
  Rank: Rank.reducer,
  UserInfo: UserInfo.reducer()
};

// 组合最终的store
const store = createStore(combineReducers(reducers), initState, enhancer);

export default store;

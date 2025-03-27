import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TypeUserInfoReducer, userInfoReducer} from './reducers/userInfo';
import {TypeFeedListReducer, feedListReducer} from './reducers/feedList';
import logger from 'redux-logger';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  // feedList: feedListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type RootReducer = {
  userInfo: TypeUserInfoReducer;
  // feedList: TypeFeedListReducer;
};

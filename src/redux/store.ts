import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import tasksReducer from './tasksReducer';
import timerReducer from './timerReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  timer: timerReducer,
  notifications: notificationsReducer,
})
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk <ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string> >;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
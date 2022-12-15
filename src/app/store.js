import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from '../components/TaskLists/TasksSlice'
import DoingReducer from "../components/TaskLists/DoingSlice"
import DoneReducer from "../components/TaskLists/DoneSlice"
import DetailReducer from "../components/TaskLists/DetailSlice"
import ActivityReducer from "../Pages/ActivityLog/ActivitySlice"
import LoginReducer from "../Pages/LogInForm/loginSlice"

import storage from "redux-persist/lib/storage"
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
          key: 'root',
          version: 1,
          storage,

}

const reducer = combineReducers({
          task: TaskReducer,
          doing: DoingReducer,
          done: DoneReducer,
          detail: DetailReducer,
          username: LoginReducer,
          activity: ActivityReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)


export const store = configureStore({
          reducer: persistedReducer
});

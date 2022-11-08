import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from '../components/Task/TasksSlice'
import DoingReducer from "../components/Task/DoingSlice"
import DoneReducer from "../components/Task/DoneSlice"
import DetailReducer from "../components/Task/DetailSlice"

export const store = configureStore({
          reducer: {
                    task: TaskReducer,
                    doing: DoingReducer,
                    done: DoneReducer,
                    detail: DetailReducer
          },
});

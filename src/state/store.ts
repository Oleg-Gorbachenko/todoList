import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistReducer} from "../reducers/todolist-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
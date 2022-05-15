import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistReducer} from "../reducers/todolist-reducer";
import thunk from "redux-thunk";
import {appReducer} from "../reducers/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
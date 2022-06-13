import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        addTodolistAC(state, action: PayloadAction<{ item: TodolistType }>) {
            state.unshift({...action.payload.item, filter: 'all', entityStatus: 'idle'})
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        updateTodolistAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].title = action.payload.title;
        },
        changeFilterAC(state, action: PayloadAction<{ value: FilterValuesType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.value;
        },
        setTodosAC(state, action: PayloadAction<{ todos: Array<TodolistType> }>) {
            return action.payload.todos.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ status: RequestStatusType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].entityStatus = action.payload.status
        },
    }
})

export const todolistReducer = slice.reducer;
export const {
    addTodolistAC,
    removeTodolistAC,
    updateTodolistAC,
    changeFilterAC,
    setTodosAC,
    changeTodolistEntityStatusAC
} = slice.actions;

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(setTodosAC({todos: res.data}))
            })
            .catch((err) => {
                dispatch(setAppStatusAC({status: 'idle'}))
                handleServerAppError(dispatch, err)
            })
    }
}

export const createTodolistThunkTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(addTodolistAC({item: res.data.data.item}))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC({error: res.data.messages[0]}))
                    } else {
                        dispatch(setAppErrorAC({error: 'some error occurred'}))
                    }
                    dispatch(setAppStatusAC({status: 'failed'}))
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

export const deleteTodolistThunkTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({status: 'loading', todolistId: todolistId}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(removeTodolistAC({todolistId}))
                }
            })
    }
}

export const updateTodolistThunkTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(updateTodolistAC({todolistId: todolistId, title: title}))
                }
            })
    }
}
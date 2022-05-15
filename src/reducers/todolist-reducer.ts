import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-utils";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOS': {
            return action.todos.map((tl) => {
                return {...tl, filter: 'all', entityStatus: 'idle'}
            })
        }
        case 'ADD-TODOLIST': {
            return [{...action.item, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'UPDATE-TODOLIST': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-FILTER' : {
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)
        }
        case 'TODOS/CHANGE-TODOLIST-STATUS' : {
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        }
        default:
            return state
    }
}

export type TodolistActionsType =
    | addTodolistACType
    | removeTodolistACType
    | updateTodolistACType
    | changeFilterACType
    | setTodosACType
    | AppActionsType
    | ChangeTodolistEntityStatusACType

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>
export type setTodosACType = ReturnType<typeof setTodosAC>
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>


export const addTodolistAC = (item: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        item
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId
    } as const
}
export const updateTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        todolistId,
        title
    } as const
}
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-FILTER',
        value,
        todoListId: todolistId
    } as const
}

export const setTodosAC = (todos: Array<TodolistType>) => {
    return {
        type: 'SET-TODOS',
        todos
    } as const
}

export const changeTodolistEntityStatusAC = (status: RequestStatusType, todolistId: string) => {
    return {
        type: 'TODOS/CHANGE-TODOLIST-STATUS',
        status,
        todolistId
    } as const
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setTodosAC(res.data))
            })
    }
}

export const createTodolistThunkTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(addTodolistAC(res.data.data.item))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('some error occurred'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

export const deleteTodolistThunkTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC('loading', todolistId))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(removeTodolistAC(todolistId))
                }
            })
    }
}

export const updateTodolistThunkTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(updateTodolistAC(todolistId, title))
                }
            })
    }
}
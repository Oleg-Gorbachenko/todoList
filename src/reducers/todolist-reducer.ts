import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: todolistReducersType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOS': {
            return action.todos.map((tl) => {
                return {...tl, filter: 'all'}
            })
        }
        case 'ADD-TODOLIST': {
            // const newTodolist: TodolistDomainType = {
            //     id: action.item.id,
            //     title: action.item.title,
            //     filter: 'all',
            //     addedDate:action.item.addedDate,
            //     order: action.item.order,
            // }
            // return [newTodolist, ...state]
            return [{...action.item, filter: 'all'}, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todoListId)
        }
        case 'UPDATE-TODOLIST': {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-FILTER' : {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.value} : tl)
        }
        default:
            return state
    }
}

type todolistReducersType =
    addTodolistACType |
    removeTodolistACType |
    updateTodolistACType |
    changeFilterACType |
    setTodosACType

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>
export type setTodosACType = ReturnType<typeof setTodosAC>


export const addTodolistAC = (item: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        item
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todoListId: todolistId}
    } as const
}
export const updateTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {todoListId: todolistId, title: title}
    } as const
}
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {value, todoListId: todolistId}
    } as const
}

export const setTodosAC = (todos: Array<TodolistType>) => {
    return {
        type: 'SET-TODOS',
        todos
    } as const
}

export const fetchTodosThunkTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodosAC(res.data))
            })
    }
}

export const createTodolistThunkTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                console.log(res)
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
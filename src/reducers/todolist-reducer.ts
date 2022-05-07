import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state = initialState, action: todolistReducersType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOS': {
            // return [...state, ...action.todos]
            return state
        }

        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {
                id: action.payload.todoListId,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0,
            }
            return [newTodolist, ...state]
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


export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todoListId: v1()}
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
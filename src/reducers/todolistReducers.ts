import {FilterValuesType, TodoListType} from "../App";

export const todolistReducers = (state: Array<TodoListType>, action: todolistReducersType): Array<TodoListType> => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist: TodoListType = {
                id: action.payload.newTodolistID,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodolist, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'UPDATE-TODOLIST': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, type: action.payload.title} : tl)
        }
        case 'CHANGE-FILTER' : {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.value} : tl)
        }
        default:
            return state
    }
}

type todolistReducersType = addTodolistACType | removeTodolistACType | updateTodolistACType | changeFilterACType

type addTodolistACType = ReturnType<typeof addTodolistAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type updateTodolistACType = ReturnType<typeof updateTodolistAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>


export const addTodolistAC = (title: string, newTodolistID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title: title, newTodolistID}
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}
export const updateTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {todolistId, title: title}
    } as const
}
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {value, todolistId}
    } as const
}
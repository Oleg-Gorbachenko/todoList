import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: tasksReducersType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTaskID = v1()
            const newTask = {id: newTaskID, title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }
        case 'UPDATE-TASK' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.updateTitle
                } : t)
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.checked
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            // const {[action.payload.todolistId]:[],...rest} = {...state}
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }
        default:
            return state
    }
}
type tasksReducersType =
    addTaskACType
    | removeTaskACType
    | updateTaskACType
    | changeTaskStatusACType
    | addTodolistACType
    | removeTodolistACType

type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title: title, todolistId}
    } as const
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistId}
    } as const
}
export const updateTaskAC = (todolistId: string, id: string, updateTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {todolistId, id, updateTitle}
    } as const
}
export const changeTaskStatusAC = (checked: boolean, taskId: string, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {checked, taskId, todolistId}
    } as const
}

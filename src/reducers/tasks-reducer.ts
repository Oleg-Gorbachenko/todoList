import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";
import {TasksStateType} from "../App";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: tasksReducersType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: action.payload.todoListId,
            }
            return {...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]}
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.id)
            }
        }
        case 'UPDATE-TASK' : {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.updateTitle
                } : t)
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    status: action.payload.status
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todoListId]: []}
        }
        case 'REMOVE-TODOLIST': {
            // const {[action.payload.todolistId]:[],...rest} = {...state}
            let newState = {...state}
            delete newState[action.payload.todoListId]
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
        payload: {title: title, todoListId: todolistId}
    } as const
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todoListId: todolistId}
    } as const
}
export const updateTaskAC = (todolistId: string, id: string, updateTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {todoListId: todolistId, id, updateTitle}
    } as const
}
export const changeTaskStatusAC = (status: TaskStatuses, taskId: string, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {status, taskId, todoListId: todolistId}
    } as const
}

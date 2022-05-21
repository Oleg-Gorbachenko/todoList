import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolist-api";
import {addTodolistACType, removeTodolistACType, setTodosACType} from "./todolist-reducer";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";
import {AppActionsType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case 'FETCH-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        case 'ADD-TASK': {
            return {...state, [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]}
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'UPDATE-TASK' : {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    ...action.model
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.item.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.todolistId]
            return newState
        }
        default:
            return state
    }
}
type TasksActionsType =
    addTaskACType
    | removeTaskACType
    | updateTaskACType
    | addTodolistACType
    | removeTodolistACType
    | setTodosACType
    | setTasksACType
    | AppActionsType

type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>

export const addTaskAC = (newTask: TaskType) => {
    return {type: 'ADD-TASK', newTask} as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK', taskId, todolistId
    } as const
}

export const updateTaskAC = (todolistId: string, id: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'UPDATE-TASK', todolistId, id, model
    } as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'FETCH-TASKS', tasks, todolistId} as const
}

export enum ResultCodeStatuses {
    success = 0,
    error = 1,
    captcha = 10,
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    dispatch(removeTaskAC(todolistId, taskId))
                }
            })
    }
}

export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    const newTask = res.data.data.item
                    dispatch(addTaskAC(newTask))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId);
        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                status: task.status,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            }
            todolistsAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === ResultCodeStatuses.success) {
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(updateTaskAC(todolistId, taskId, domainModel))
                    }
                })
        }
    }
}
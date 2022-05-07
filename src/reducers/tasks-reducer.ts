import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolist-api";
import {addTodolistACType, removeTodolistACType, setTodosACType} from "./todolist-reducer";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: tasksReducersType): TasksStateType => {
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
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
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
type tasksReducersType =
    addTaskACType
    | removeTaskACType
    | updateTaskACType
    | addTodolistACType
    | removeTodolistACType
    | setTodosACType
    | setTasksACType

type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>

export const addTaskAC = (newTask: TaskType) => {
    return {type: 'ADD-TASK', newTask} as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskId, todoListId: todolistId}
    } as const
}

export const updateTaskAC = (todolistId: string, id: string, model: UpdateTaskModelType) => {
    return {
        type: 'UPDATE-TASK', todolistId, id, model
    } as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'FETCH-TASKS', tasks, todolistId} as const
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todolistId, taskId))
                }
            })
    }
}

export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const newTask = res.data.data.item
                    dispatch(addTaskAC(newTask))
                }
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
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(todolistId, taskId, model))
                    }
                })
        }
    }
}
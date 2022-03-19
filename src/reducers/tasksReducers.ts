import {TasksStateType} from "../App";

export const tasksReducers = (state: TasksStateType, action: tasksReducersType): TasksStateType => {
    switch (action.title) {
        case 'ADD-TASK': {
            const newTask = {id: action.payload.newTaskID, title: action.payload.title, isDone: false}
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
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.checked
                } : el)
            }
        }
        case 'ADD-NEW-TASKS-ARRAY': {
            return {...state, [action.payload.newTodolistID]: []}
        }
        case 'RETURN-TASKS-ARRAY': {
            return {...state}
        }
        default:
            return state
    }
}
type tasksReducersType =
    addTaskACType
    | removeTaskACType
    | updateTaskACType
    | changeStatusACType
    | addNewTasksArrayType
    | returnTasksArrayType

type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addNewTasksArrayType = ReturnType<typeof addNewTasksArrayAC>
type returnTasksArrayType = ReturnType<typeof returnTasksArrayAC>

export const addTaskAC = (title: string, todolistId: string, newTaskID: string) => {
    return {
        title: 'ADD-TASK',
        payload: {title, todolistId, newTaskID}
    } as const
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        title: 'REMOVE-TASK',
        payload: {id, todolistId}
    } as const
}
export const updateTaskAC = (todolistId: string, id: string, updateTitle: string) => {
    return {
        title: 'UPDATE-TASK',
        payload: {todolistId, id, updateTitle}
    } as const
}
export const changeStatusAC = (checked: boolean, taskId: string, todolistId: string) => {
    return {
        title: 'CHANGE-STATUS',
        payload: {checked, taskId, todolistId}
    } as const
}
export const addNewTasksArrayAC = (newTodolistID: string) => {
    return {
        title: "ADD-NEW-TASKS-ARRAY",
        payload: {newTodolistID}
    } as const
}
export const returnTasksArrayAC = () => {
    return {
        title: 'RETURN-TASKS-ARRAY'
    } as const
}
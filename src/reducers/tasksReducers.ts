import {TasksStateType} from "../App";

export const tasksReducers = (state: TasksStateType, action: tasksReducersType): TasksStateType => {
    switch (action.type) {
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
            return {...state} //??
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
        type: 'ADD-TASK',
        payload: {title: title, todolistId, newTaskID}
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
export const changeStatusAC = (checked: boolean, taskId: string, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {checked, taskId, todolistId}
    } as const
}
export const addNewTasksArrayAC = (newTodolistID: string) => {
    return {
        type: "ADD-NEW-TASKS-ARRAY",
        payload: {newTodolistID}
    } as const
}
export const returnTasksArrayAC = () => {
    return {
        type: 'RETURN-TASKS-ARRAY'
    } as const
}
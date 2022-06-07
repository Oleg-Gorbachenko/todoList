import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolist-api";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodosAC} from "./todolist-reducer";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<{ newTask: TaskType }>) {
            state[action.payload.newTask.todoListId].unshift(action.payload.newTask)
        },
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, id: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.id);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.item.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(setTodosAC, (state, action) => {
            action.payload.todos.forEach(tl => state[tl.id] = [])
        });
    }
})

export const tasksReducer = slice.reducer;
export const {addTaskAC, removeTaskAC, updateTaskAC, setTasksAC} = slice.actions;

export enum ResultCodeStatuses {
    success = 0,
    error = 1,
    captcha = 10,
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                const tasks = res.data.items
                dispatch(setTasksAC({tasks, todolistId}))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    dispatch(removeTaskAC({todolistId, taskId}))
                }
            })
    }
}

export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    const newTask = res.data.data.item
                    dispatch(addTaskAC({newTask}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
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
        dispatch(setAppStatusAC({status: 'loading'}))
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
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                        dispatch(updateTaskAC({todolistId, id: taskId, model: domainModel}))
                    }
                })
        }
    }
}
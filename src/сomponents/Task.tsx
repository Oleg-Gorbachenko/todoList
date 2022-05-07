import React, {memo, useCallback} from 'react';
import styles from "./Todolist.module.css";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskAC} from "../reducers/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolist-api";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = memo(({task, todolistId}: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickRemoveTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [dispatch, todolistId])

    const changeTaskStatus = useCallback((status: TaskStatuses, taskId: string) => {
        dispatch(changeTaskStatusAC(status, taskId, todolistId))
    }, [dispatch, todolistId])

    const updateTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(updateTaskAC(todolistId, taskId, title))
    }, [dispatch, todolistId])

    return (
        <li className={task.status === TaskStatuses.Completed ? styles.isDone : ''}>
            <CheckBox isDone={task.status === TaskStatuses.Completed}
                      callBack={(status) => changeTaskStatus(status, task.id)}
            />
            <EditableSpan
                oldTitle={task.title}
                updateTask={(title: string) => updateTaskTitle(task.id, title)}
            />
            <IconButton onClick={() => onClickRemoveTask(task.id)}
                        aria-label="delete" size="small">
                <Delete fontSize="inherit"/>
            </IconButton>
        </li>
    )
})

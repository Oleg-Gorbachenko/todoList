import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {FilterValuesType} from "../reducers/todolist-reducer";
import {fetchTasksTC} from "../reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {RequestStatusType} from "../reducers/app-reducer";

type TodoListPropsType = {
    title: string
    addTask: (title: string, todolistId: string) => void
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTodolist: (todolistId: string, title: string) => void
    entityStatus: RequestStatusType
}

export const Todolist = memo(({
                                  title,
                                  addTask,
                                  tasks,
                                  filter,
                                  changeFilter,
                                  todolistId,
                                  removeTodolist,
                                  updateTodolist,
                                  entityStatus,
                              }: TodoListPropsType) => {

    useEffect(() => {
        dispatch(fetchTasksTC(todolistId))
    }, [])

    const dispatch = useDispatch()
    //функции
    const onClickChangeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        changeFilter(value, todolistId)
    }, [changeFilter])

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolistId)
    }, [removeTodolist, todolistId])

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todolistId)
    }, [addTask, todolistId])

    const updateTodolistHandler = useCallback((title: string) => {
        updateTodolist(todolistId, title)
    }, [updateTodolist, todolistId])

    //условие фильтрации тасок
    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} updateTask={updateTodolistHandler}/>
                <IconButton onClick={removeTodolistHandler} aria-label="delete" size="small"
                            disabled={entityStatus === 'loading'}>
                    <Delete fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler} disabled={entityStatus === 'loading'}/>
            <ul>
                {
                    tasksForTodolist.map(t => {

                        return (
                            <Task
                                key={t.id}
                                task={t}
                                todolistId={todolistId}
                            />
                        )
                    })}
            </ul>
            <div>
                <Button variant={filter === 'all' ? "outlined" : "contained"} color="secondary"
                        onClick={() => onClickChangeFilter('all', todolistId)}>All</Button>
                <Button variant={filter === 'active' ? "outlined" : "contained"} color="success"
                        onClick={() => onClickChangeFilter('active', todolistId)}>Active</Button>
                <Button variant={filter === 'completed' ? "outlined" : "contained"} color="error"
                        onClick={() => onClickChangeFilter('completed', todolistId)}>Completed</Button>
            </div>
        </div>
    )
})

import React, {memo, useCallback} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    isDone: boolean
    title: string
}
type TodoListPropsType = {
    title: string
    addTask: (title: string, todolistId: string) => void
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTodolist: (todolistId: string, title: string) => void
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
                              }: TodoListPropsType) => {
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
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} updateTask={updateTodolistHandler}/>
                <IconButton onClick={removeTodolistHandler} aria-label="delete" size="small">
                    <Delete fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
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

import React from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import styles from "./Todolist.module.css";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    isDone: boolean
    title: string
}
type TodoListPropsType = {
    title: string
    filteredTasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (checked: boolean, taskId: string, todolistId: string) => void
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, id: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodoListPropsType) => {
    //функции
    const onClickChangeFilter = (value: FilterValuesType, todolistId: string) => {
        props.changeFilter(value, todolistId)
    }
    const onClickRemoveTaskHandler = (value: string, todolistId: string) => {
        props.removeTask(value, todolistId)
    }
    const changeStatusHandler = (checked: boolean, tId: string, todolistId: string) => {
        props.changeStatus(checked, tId, todolistId)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const updateTaskHandler = (tId: string, title: string) => {
        props.updateTask(props.todolistId,tId,title)
    }
    const updateTodolistHandler=(title:string)=>{
        props.updateTodolist(props.todolistId,title)
    }
    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.type} updateTask={updateTodolistHandler}/>
                <IconButton onClick={removeTodolist}  aria-label="delete" size="small">
                    <Delete fontSize="inherit" />
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
            <ul>
                {props.filteredTasks.map((t) => {
                    return (
                        <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                            <CheckBox isDone={t.isDone}
                                      callBack={(checked) => changeStatusHandler(checked, t.id, props.todolistId)}/>
                            <EditableSpan
                                oldTitle={t.type}
                                updateTask={(title:string)=>updateTaskHandler(t.id,title)}
                            />
                            <IconButton onClick={() => onClickRemoveTaskHandler(t.id, props.todolistId)}  aria-label="delete" size="small">
                                <Delete fontSize="inherit" />
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ?"outlined":"contained"} color="secondary"
                        onClick={() => onClickChangeFilter('all', props.todolistId)}>All</Button>
                <Button variant={props.filter === 'active' ?"outlined":"contained"} color="success"
                        onClick={() => onClickChangeFilter('active', props.todolistId)}>Active</Button>
                <Button variant={props.filter === 'completed' ?"outlined":"contained"} color="error"
                        onClick={() => onClickChangeFilter('completed', props.todolistId)}>Completed</Button>
            </div>
        </div>
    )
}

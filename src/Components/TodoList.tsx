import React from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import styles from "./Todolist.module.css";
import {CheckBox} from "./CheckBox";

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
}

export const TodoList = (props: TodoListPropsType) => {
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

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
            <ul>
                {props.filteredTasks.map((t) => {
                    return (
                        <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                            <button onClick={() => onClickRemoveTaskHandler(t.id, props.todolistId)}>x</button>
                            <CheckBox isDone={t.isDone}
                                      callBack={(checked) => changeStatusHandler(checked, t.id, props.todolistId)}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? styles.activeFilter : styles.button}
                        onClick={() => onClickChangeFilter('all', props.todolistId)}>All
                </button>
                <button className={props.filter === 'active' ? styles.activeFilter : styles.button}
                        onClick={() => onClickChangeFilter('active', props.todolistId)}>Active
                </button>
                <button className={props.filter === 'completed' ? styles.activeFilter : styles.button}
                        onClick={() => onClickChangeFilter('completed', props.todolistId)}>Completed
                </button>
            </div>
        </div>
    )
}


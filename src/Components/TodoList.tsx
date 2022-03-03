import React from "react";
import {FilterValuesType} from "../App";
import {FullInput} from "./FullInput";
import styles from "./Todolist.module.css";
import {CheckBox} from "./CheckBox";

type TaskType = {
    id: string
    isDone: boolean
    title: string
}
type TodoListPropsType = {
    title: string
    filteredTasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeStatus: (checked: boolean, taskId: string) => void
    filter: FilterValuesType
    setFilter: (value: FilterValuesType) => void
}

export const TodoList = (props: TodoListPropsType) => {
    //хуки


    //функции
    const onClickChangeFilter = (value: FilterValuesType) => {
        props.setFilter(value)
    }
    const onClickRemoveTaskHandler = (value: string) => {
        props.removeTask(value)
    }
    const changeStatusHandler = (checked: boolean, tId: string) => {
        props.changeStatus(checked, tId)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <FullInput name={'+'} addTask={props.addTask}/>
            </div>
            <ul>
                {props.filteredTasks.map((t) => {
                    return (
                        <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                            <button onClick={() => onClickRemoveTaskHandler(t.id)}>x</button>
                            <CheckBox isDone={t.isDone}
                                      callBack={(checked) => changeStatusHandler(checked, t.id)}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? styles.activeFilter : styles.button}
                        onClick={() => onClickChangeFilter('all')}>All
                </button>
                <button className={props.filter === 'active' ? styles.activeFilter : styles.button}
                        onClick={() => onClickChangeFilter('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? styles.activeFilter : styles.button}
                        onClick={() => onClickChangeFilter('completed')}>Completed
                </button>
            </div>
        </div>
    )
}


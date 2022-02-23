import React, {useState} from "react";
import {FilterValuesType} from "../App";
import {FullInput} from "./FullInput";
import styles from "./Todolist.module.css";
import {CheckBox} from "./CheckBox";

export type TaskType = {
    id: string
    isDone: boolean
    title: string
}
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeStatus: (checked: boolean, taskId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    //хуки
    let [filter, setFilter] = useState<FilterValuesType>('all')

    //функции
    const onClickChangeFilter = (value: FilterValuesType) => {
        changeFilter(value)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const onClickRemoveTaskHandler = (value: string) => {
        props.removeTask(value)
    }
    const changeStatusHandler = (checked: boolean, tId: string) => {
        props.changeStatus(checked, tId)
    }

    //условие фильтрации
    let filteredTasks = props.tasks;
    if (filter === 'completed') {
        filteredTasks = props.tasks.filter(t => t.isDone);
    }
    if (filter === 'active') {
        filteredTasks = props.tasks.filter(t => !t.isDone);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <FullInput name={'+'} addTask={props.addTask}/>
            </div>
            <ul>
                {filteredTasks.map((t) => {
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
                <button className={filter === 'all' ? styles.activeFilter : ''}
                        onClick={() => onClickChangeFilter('all')}>All
                </button>
                <button className={filter === 'active' ? styles.activeFilter : ''}
                        onClick={() => onClickChangeFilter('active')}>Active
                </button>
                <button className={filter === 'completed' ? styles.activeFilter : ''}
                        onClick={() => onClickChangeFilter('completed')}>Completed
                </button>
            </div>
        </div>
    )
}


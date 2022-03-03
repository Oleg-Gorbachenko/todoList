import React from "react";
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
    filteredTasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (checked: boolean, taskId: string, todolistId: string) => void
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    id: string
    removeTodolist: (todolistId:string) => void
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
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <FullInput name={'+'} addTask={props.addTask} id={props.id}/>
            </div>
            <ul>
                {props.filteredTasks.map((t) => {
                    return (
                        <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                            <button onClick={() => onClickRemoveTaskHandler(t.id, props.id)}>x</button>
                            <CheckBox isDone={t.isDone}
                                      callBack={(checked) => changeStatusHandler(checked, t.id, props.id)}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? styles.activeFilter : styles.button}
                        onClick={() => onClickChangeFilter('all', props.id)}>All
                </button>
                <button className={props.filter === 'active' ? styles.activeFilter : styles.button}
                        onClick={() => onClickChangeFilter('active', props.id)}>Active
                </button>
                <button className={props.filter === 'completed' ? styles.activeFilter : styles.button}
                        onClick={() => onClickChangeFilter('completed', props.id)}>Completed
                </button>
            </div>
        </div>
    )
}


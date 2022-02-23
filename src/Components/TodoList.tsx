import React, {useState, ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import {FullInput} from "./FullInput";

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
                        <li key={t.id}>
                            <button onClick={() => onClickRemoveTaskHandler(t.id)}>x</button>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => changeStatusHandler(event.currentTarget.checked, t.id)}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => onClickChangeFilter('all')}>All</button>
                <button onClick={() => onClickChangeFilter('active')}>Active</button>
                <button onClick={() => onClickChangeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}


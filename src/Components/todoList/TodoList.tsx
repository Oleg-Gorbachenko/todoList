import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../../App";

export type TaskType = {
    id: string
    isDone: boolean
    title: string
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
}

export const TodoList = (props: PropsType) => {
    //хуки
    let [filter, setFilter] = useState<FilterValuesType>('all')
    let [title, setTitle] = useState('')
    //функции
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressButtonHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ('Enter')) {
            onClickAddButton()
        }
    }
    const onClickAddButton = () => {
        props.addTask(title)
        setTitle('')
    }
    const onClickChangeFilter = (value: FilterValuesType) => {
        changeFilter(value)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const onClickRemoveTaskHandler = (value: string) => {
        props.removeTask(value)
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
                <input value={title} onChange={onChangeInputHandler} onKeyPress={onKeyPressButtonHandler}/>
                <button onClick={onClickAddButton}>+</button>
            </div>
            <ul>
                {filteredTasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <button onClick={() => onClickRemoveTaskHandler(t.id)}>x
                            </button>
                            <input type="checkbox" checked={t.isDone}/>
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


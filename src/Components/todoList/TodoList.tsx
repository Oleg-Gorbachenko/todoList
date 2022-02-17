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
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const TodoList = (props: PropsType) => {
    //хуки
    let [title, setTitle] = useState('')
    //функции
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressButtonHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ('Enter')) {
            props.addTask(title)
            setTitle('')
        }
    }
    const onClickAddButton = () => {
        props.addTask(title)
        setTitle('')
    }
    const onClickChangeFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeInputHandler} onKeyPress={onKeyPressButtonHandler}/>
                <button onClick={onClickAddButton}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>x
                            </button>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => onClickChangeFilter('all')}>All
                </button>
                <button onClick={() => onClickChangeFilter('active')}>Active
                </button>
                <button onClick={() => onClickChangeFilter('completed')}>Completed
                </button>
            </div>
        </div>
    )
}


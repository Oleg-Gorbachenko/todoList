import React, {ChangeEvent, useState} from "react";
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
    addTask: (title:string) => void
}

export const TodoList = (props: PropsType) => {
    let [title, setTitle] = useState('')

    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    }

    const onClickAddButton = () => {
        props.addTask(title)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeInputHandler}/>
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
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}


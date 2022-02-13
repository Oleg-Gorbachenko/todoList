import React from "react";
import {FilterValuesType} from "../../App";


export type TaskType = {
    id: number
    isDone: boolean
    title: string
}


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:number) => void
    changeFilter:(value:FilterValuesType) => void
}



export const TodoList = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <button onClick={() => {props.removeTask(t.id)}}>x</button>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}


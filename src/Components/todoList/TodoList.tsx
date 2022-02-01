import React from "react";

type TodolistType={
    title: string
    tasks: Array<ObjectFromArray>

}

type ObjectFromArray={
    id: number
    isDone: boolean
    title: string
}

export const TodoList = (props:TodolistType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((m, index)=>{
                    debugger
                    return (
                        <li key={index}><input type="checkbox" checked={m.isDone}/> <span>{m.title}</span></li>
                    )
                })}
                {/*<li><input type="checkbox" checked={props.arrForTodolist1[0].isDone}/> <span>{props.arrForTodolist1[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.arrForTodolist1[1].isDone}/> <span>{props.arrForTodolist1[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.arrForTodolist1[2].isDone}/> <span>{props.arrForTodolist1[2].title}</span></li>*/}
                {/*/!*<li><input type="checkbox" checked={true}/> <span>JS</span></li>*!/*/}
                {/*<li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
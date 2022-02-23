import React, {useState} from "react";
import {Button} from "./Button";
import {Input} from "./Input";

type FullInputPropsType = {
    addTask: (title: string) => void
    name: string
}

export const FullInput = (props: FullInputPropsType) => {
    let [title, setTitle] = useState('')

    const callBack = () => {
        if (title !== '') {
            props.addTask(title.trim())
            setTitle('')
        }
    }
    return (
        <div>
            <Input setTitle={setTitle} title={title} callBack={callBack}/>
            <Button name={props.name} callBack={callBack}/>
        </div>

    )
}
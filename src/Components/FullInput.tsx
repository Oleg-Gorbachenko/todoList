import React, {useState} from "react";
import {Button} from "./Button";
import {Input} from "./Input";
import styles from "./Todolist.module.css";

type FullInputPropsType = {
    addTask: (title: string) => void
    name: string
}

export const FullInput = (props: FullInputPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const callBack = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError("title is required")
        }
    }
    return (
        <div>
            <Input error={error}
                   setTitle={setTitle}
                   title={title}
                   callBack={callBack}
                   setError={setError}/>
            <Button name={props.name}
                    callBack={callBack}/>
            {error && <div className={styles.errorMessage}>title is required</div>}

        </div>

    )
}
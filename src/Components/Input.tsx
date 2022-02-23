import React, {ChangeEvent, KeyboardEvent} from "react";
import styles from "./Todolist.module.css";

type InputPropsType = {
    callBack: () => void
    title: string
    setTitle: (event: string) => void
    error: string | null
    setError: (arg0: string | null) => void
}

export const Input = (props: InputPropsType) => {


    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setError(null)
        props.setTitle(event.currentTarget.value)
    }
    const onKeyPressButtonHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ('Enter')) {
            props.callBack()
        }
    }
    return (
        <input className={props.error ? styles.error : ''}
               value={props.title}
               onChange={onChangeInputHandler}
               onKeyPress={onKeyPressButtonHandler}/>
    )
}
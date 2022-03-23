import React, {ChangeEvent, KeyboardEvent} from "react";
import styles from "./Todolist.module.css";
import {TextField} from "@material-ui/core";

type InputPropsType = {
    callBack: () => void
    title: string
    setTitle: (event: string) => void
    error: string | null
    setError: (arg0: string | null) => void
}

export const InputComponent = (props: InputPropsType) => {


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
        <TextField className={props.error ? styles.error : ''}
                   value={props.type}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressButtonHandler}
                   id="outlined-basic"
                   label={props.error}
                   variant="outlined"
                   size="small"
                   error={!!props.error}
        />
    )
}
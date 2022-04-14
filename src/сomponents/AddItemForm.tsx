import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import styles from "./Todolist.module.css";

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError("title is required")
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressButtonHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (event.key === ('Enter')) {
            addItem()
        }
    }
    return (
        <div>
            <TextField className={error ? styles.error : ''}
                       value={title}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressButtonHandler}
                       id="outlined-basic"
                       label={error}
                       variant="outlined"
                       size="small"
                       error={!!error}
            />
            <Button onClick={addItem}
                    variant="contained"
                    size="small"
                    sx={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
            >+</Button>
        </div>
    )
})
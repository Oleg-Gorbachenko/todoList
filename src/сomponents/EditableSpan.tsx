import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    oldTitle: string
    updateTask: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.oldTitle)

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        props.updateTask(title)
    }
    const onKeyPressButtonHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ('Enter')) {
            setEditMode(false)
            props.updateTask(title)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ?
            <TextField onBlur={onBlurHandler} autoFocus
                       onKeyPress={onKeyPressButtonHandler}
                       value={title}
                       onChange={onChangeHandler}
                       id="outlined-basic"
                       label="Outlined"
                       variant="outlined"
                       size="small"/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>

    );
};


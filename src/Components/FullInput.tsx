import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type FullInputPropsType = {
    addTask: (title: string) => void
}

export const FullInput = (props: FullInputPropsType) => {
    let [title, setTitle] = useState('')
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressButtonHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ('Enter')) {
            onClickAddButton()
        }
    }
    const onClickAddButton = () => {
        props.addTask(title)
        setTitle('')
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressButtonHandler}/>
            <button onClick={onClickAddButton}>+</button>
        </div>

    )
}
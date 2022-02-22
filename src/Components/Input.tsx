import React, {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
    callBack: () => void
    title: string
    setTitle: (event: string) => void
}

export const Input = (props: InputPropsType) => {
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value)
    }
    const onKeyPressButtonHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ('Enter')) {
            props.callBack()
        }
    }
    return (
        <input value={props.title}
               onChange={onChangeInputHandler}
               onKeyPress={onKeyPressButtonHandler}/>
    )
}
import React, {useState} from "react";
import {ButtonComponent} from "./ButtonComponent";
import {InputComponent} from "./InputComponent";

type PropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const callBack = () => {
        if (title.trim() !== '') {
            props.callBack(title.trim())
            setTitle('')
        } else {
            setError("title is required")
        }
    }
    return (
        <div>
            <InputComponent error={error}
                            setTitle={setTitle}
                            title={title}
                            callBack={callBack}
                            setError={setError}/>
            <ButtonComponent callBack={callBack}/>



        </div>
    )
}
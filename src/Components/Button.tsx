import React from "react";

type ButtonPropsType = {
    callBack: () => void
    name: string
}

export const Button = (props: ButtonPropsType) => {
    const onClickAddButton = () => {
        props.callBack()
    }
    return (
        <button onClick={onClickAddButton}>{props.name}</button>
    )
}
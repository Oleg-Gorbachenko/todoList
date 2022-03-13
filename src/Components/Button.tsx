import React from "react";

type ButtonPropsType = {
    callBack: () => void
}

export const Button = (props: ButtonPropsType) => {
    const onClickAddButton = () => {
        props.callBack()
    }
    return (
        <button onClick={onClickAddButton}>+</button>
    )
}
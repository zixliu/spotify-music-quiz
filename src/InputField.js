import React from 'react'

export default function InputField() {

    const onChange = (e) => {
        console.log(e)
    }

    return (
        <div>
            <input onChange='onChange'></input>
        </div>
    )
}

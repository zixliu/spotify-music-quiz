import React from 'react'

export default function Menu({changeGameState}) {

    const onClick = () => {
        changeGameState(true)
    }

    return (
        <div>
            <button onClick={onClick}>Play</button>
            <button>Settings</button>
        </div>
    )
}

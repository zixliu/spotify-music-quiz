import { Link } from 'react-router-dom'

export default function Menu({changeGameState}) {

    const onClick = () => {
        changeGameState(true)
    }

    return (
        <div>
            <button onClick={onClick}>Play</button>
            <Link to="/settings"><button>Settings</button></Link>
        </div>
    )
}

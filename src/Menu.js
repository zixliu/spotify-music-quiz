import { Link } from 'react-router-dom'

export default function Menu({changeGameState, settings}) {

    const onClick = () => {
        changeGameState(true)
        console.log("Number of tracks: " + settings.numberOfTracks)
        console.log("Playlist: " + settings.playlist)
    }

    return (
        <div>
            <button onClick={onClick}>Play</button>
            <Link to="/settings"><button>Settings</button></Link>
        </div>
    )
}

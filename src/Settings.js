import { Link } from 'react-router-dom'

export default function Settings({getSettings}) {

    const onClick = () => {
        let numberOfTracks = document.getElementById('inputNumberOfTracks').value;
        let playlist = document.getElementById('inputPlaylist').value;
        getSettings(numberOfTracks, playlist)
    }

    return (

        <div>
            <h1>Settings</h1>
            <input id="inputNumberOfTracks" placeholder="Number of tracks"></input>
            <input id="inputPlaylist" placeholder="Playlist"></input>
            <Link to="/"><button onClick={onClick}>Save settings</button></Link>
        </div>
    )
}

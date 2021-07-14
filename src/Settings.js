import { Link } from 'react-router-dom'

export default function Settings({getSettings}) {

    const onClick = () => {
        let numberOfTracks = document.getElementById('inputNumberOfTracks').value;
        let playlistEmbed = document.getElementById('inputPlaylist').value;
        let playlist = playlistEmbed.match('(?<=playlist\/)(.*?)(?=["\?])')[0]
        getSettings(numberOfTracks, playlist)
    }

    return (
        <div>
            <h1>Settings</h1>
            <input id="inputNumberOfTracks" placeholder="Number of tracks" autoComplete="off"></input>
            <input id="inputPlaylist" placeholder="Copy & paste playlist embed code" autoComplete="off"></input>
            <Link to="/"><button onClick={onClick}>Save settings</button></Link>
        </div>
    )
}

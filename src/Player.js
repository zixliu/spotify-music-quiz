import './Player.css';
import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ token, track }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [track])
  if (!token) return null
  return (
    <div>
      <div class = "player">
        <SpotifyPlayer
          token={token}
          showSaveIcon
          callback={state => {
            if (!state.isPlaying) setPlay(false)
          }}
          play={play}
          autoPlay = {true}
          uris={track ? [track.uri] : []}
        />
      </div>
      <img class="equalizer" src="http://cdn.lowgif.com/medium/501ab4c23e198d0f-.gif" alt="Equalizer" width="150px"/>
    </div>
  )
}